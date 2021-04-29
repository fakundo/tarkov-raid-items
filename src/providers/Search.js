import React, { createContext, useMemo, useState, useCallback } from 'react'

const getInitialState = () => ({
  searchBoxOpen: false,
  searchTerm: '',
})

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [state, setState] = useState(getInitialState)

  const openSearchBox = useCallback(() => {
    setState((prevState) => ({
      ...prevState, searchBoxOpen: true,
    }))
  }, [])

  const closeSearchBox = useCallback(() => {
    setState((prevState) => ({
      ...prevState, searchBoxOpen: false,
    }))
  }, [])

  const updateSearchTerm = useCallback((searchTerm) => {
    setState((prevState) => ({
      ...prevState, searchTerm,
    }))
  }, [])

  const value = useMemo(() => ({
    ...state,
    openSearchBox,
    closeSearchBox,
    updateSearchTerm,
  }), [state])

  return (
    <SearchContext.Provider value={value}>
      { children}
    </SearchContext.Provider>
  )
}
