import { useMemo } from 'react'
import { setLocalStorageItem, getLocalStorageItem } from 'utils'

export default (key) => (
  useMemo(() => ({
    get: () => getLocalStorageItem(key),
    set: (data) => setLocalStorageItem(key, data),
  }), [key])
)
