import { useMemo } from 'react'
import { setLocalStorageItem, getLocalStorageItem } from 'utils'

export default (key) => (
  useMemo(() => ({
    getStorageItem: () => getLocalStorageItem(key),
    setStorageItem: (data) => setLocalStorageItem(key, data),
  }), [key])
)
