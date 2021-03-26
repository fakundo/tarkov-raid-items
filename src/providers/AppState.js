import React, { createContext, useMemo, useState, useCallback, useEffect } from 'react'
import clamp from 'lodash/clamp'
import reduce from 'lodash/reduce'
import uniqueId from 'lodash/uniqueId'
import { getNavigatorLanguage, getFilterCount } from 'utils'
import { useLocalStorage } from 'hooks'
import { items } from 'data'

const getProgress = (counters) => {
  const { total, found } = reduce(items, (acc, item, key) => {
    const itemAmount = reduce(item.quest, (amountAcc, amount) => (amountAcc + amount), 0)
    const itemFound = clamp(counters?.[key] || 0, 0, itemAmount)
    return {
      total: (acc.total || 0) + itemAmount,
      found: (acc.found || 0) + itemFound,
    }
  }, {})
  return { found, total }
}

export const AppStateContext = createContext()

export const AppStateProvider = ({ children }) => {
  const { get, set } = useLocalStorage('state')
  const [state, setState] = useState(get)

  useEffect(() => {
    set(state)
  }, [state])

  const updateLocale = useCallback((locale) => {
    setState((prevState) => ({
      ...prevState, locale,
    }))
  }, [])

  const updateFilter = useCallback((filter) => {
    setState((prevState) => ({
      ...prevState, filter, filterKey: uniqueId(),
    }))
  }, [])

  const resetProgress = useCallback(() => {
    setState((prevState) => ({
      ...prevState, counters: {}, filterKey: uniqueId(),
    }))
  }, [])

  const updateCounter = useCallback((itemKey, value) => {
    setState((prevState) => ({
      ...prevState,
      counters: {
        ...prevState?.counters,
        [itemKey]: value,
      },
    }))
  }, [])

  const value = useMemo(() => ({
    filterKey: state?.filterKey || 0,
    filter: state?.filter || {},
    counters: state?.counters || {},
    locale: state?.locale || getNavigatorLanguage(),
    filterCount: getFilterCount(state?.filter),
    progress: getProgress(state?.counters),
    updateFilter,
    updateLocale,
    updateCounter,
    resetProgress,
  }), [state])

  return (
    <AppStateContext.Provider value={value}>
      { children(value) }
    </AppStateContext.Provider>
  )
}
