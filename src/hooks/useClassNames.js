import { useMemo } from 'react'
import classNames from 'classnames'

export default (creator, deps = []) => (
  useMemo(() => classNames(creator()), deps)
)
