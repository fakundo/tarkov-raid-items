import React, { memo, useEffect, useRef, forwardRef } from 'react'
import { createUseStyles, useClassNames } from 'hooks'
import { resetAppearance, createPlaceholderStyles } from 'utils'

const useStyles = createUseStyles((theme) => ({
  root: {
    ...resetAppearance(),
    ...createPlaceholderStyles({
      color: theme.palette.text.muted,
    }),
    borderBottom: '2px solid currentColor',
    color: theme.palette.text.default,
    height: '1.5rem',
    display: 'block',
    width: '100%',
  },
}))

export default memo(forwardRef(({ className, autoFocus, ...rest }, derivedRef) => {
  const defaultRef = useRef()
  const ref = derivedRef || defaultRef
  const classes = useStyles()

  useEffect(() => {
    if (autoFocus) {
      ref.current?.select()
    }
  }, [])

  const cx = useClassNames(() => [
    className, classes.root,
  ], [classes, className])

  return (
    <input
      ref={ref}
      type="text"
      tabIndex="-1"
      className={cx}
      {...rest}
    />
  )
}))
