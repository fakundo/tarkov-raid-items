import React, { createContext, useMemo, useCallback, useRef, useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import uniqueId from 'lodash/uniqueId'
import { getNavigatorLanguage, getFilterCount, calculateProgress, updateAppStateCounters, unstringifyState, stringifyState, createStateExportLink } from 'utils'
import { useLocalStorage, useHash } from 'hooks'

const storageStateKey = 'state'
const itemsIdempotencyKeyPrefix = 'items-'

export const AppStateContext = createContext()

export const AppStateProvider = ({ children }) => {
  const { getStorageItem, setStorageItem } = useLocalStorage(storageStateKey)
  const { getHash, setHash } = useHash()
  const isHashStateRef = useRef()
  const itemsIdempotencyRef = useRef(itemsIdempotencyKeyPrefix)

  const [state, setState] = useState(() => {
    const hashState = unstringifyState(getHash())
    const storageState = getStorageItem() || {}
    isHashStateRef.current = !isEmpty(hashState)
    return isHashStateRef.current ? hashState : storageState
  })

  useEffect(() => {
    if (isHashStateRef.current) {
      setHash(stringifyState(state))
    } else {
      setStorageItem(state)
    }
  }, [state])

  const updateLocale = useCallback((locale) => {
    setState((prevState) => ({ ...prevState, locale }))
  }, [])

  const updateFilter = useCallback((filter) => {
    itemsIdempotencyRef.current = uniqueId(itemsIdempotencyKeyPrefix)
    setState((prevState) => ({ ...prevState, filter }))
  }, [])

  const resetProgress = useCallback(() => {
    itemsIdempotencyRef.current = uniqueId(itemsIdempotencyKeyPrefix)
    setState((prevState) => ({ ...prevState, counters: {} }))
  }, [])

  const updateCounter = useCallback((itemKey, value) => {
    setState((prevState) => updateAppStateCounters(prevState, itemKey, value))
  }, [])

  const createExportLink = useCallback(() => (
    createStateExportLink(state)
  ), [state])

  const importState = useCallback(() => {
    isHashStateRef.current = false
    setHash()
    setState({ ...state })
  }, [state])

  const rejectImport = useCallback(() => {
    isHashStateRef.current = false
    itemsIdempotencyRef.current = uniqueId(itemsIdempotencyKeyPrefix)
    setHash()
    setState(getStorageItem() || {})
  }, [state])

  const value = useMemo(() => ({
    itemsIdempotencyKey: itemsIdempotencyRef.current,
    isImportAvailable: isHashStateRef.current,
    filter: state.filter || {},
    counters: state.counters || {},
    locale: state.locale || getNavigatorLanguage(),
    filterCount: getFilterCount(state?.filter),
    progress: calculateProgress(state?.counters),
    updateFilter,
    updateLocale,
    updateCounter,
    resetProgress,
    createExportLink,
    importState,
    rejectImport,
  }), [state])

  return (
    <AppStateContext.Provider value={value}>
      {children(value)}
    </AppStateContext.Provider>
  )
}
