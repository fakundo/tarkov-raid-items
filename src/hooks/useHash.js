import { useMemo } from 'react'
import { setHash, getHash } from 'utils'

export default () => (
  useMemo(() => ({
    getHash,
    setHash,
  }), [])
)
