import React, { memo } from 'react'
import { createUseStyles, useClassNames } from 'hooks'
import { breakpoints } from 'utils'

const createPadding = (padding) => ({
  padding,
  '@supports (top: max(0px))': {
    paddingTop: `max(var(--safe-area-top), ${padding})`,
    paddingRight: `max(var(--safe-area-right), ${padding})`,
    paddingBottom: `max(var(--safe-area-bottom), ${padding})`,
    paddingLeft: `max(var(--safe-area-left), ${padding})`,
  },
})

const useStyles = createUseStyles({
  '@global': {
    ':root': {
      '--safe-area-top': 0,
      '--safe-area-right': 0,
      '--safe-area-bottom': 0,
      '--safe-area-left': 0,
      '@supports (top: constant(safe-area-inset-top))': {
        '--safe-area-top': 'constant(safe-area-inset-top)',
        '--safe-area-right': 'constant(safe-area-inset-right)',
        '--safe-area-bottom': 'constant(safe-area-inset-bottom)',
        '--safe-area-left': 'constant(safe-area-inset-left)',
      },
      '@supports (top: env(safe-area-inset-top))': {
        '--safe-area-top': 'env(safe-area-inset-top)',
        '--safe-area-right': 'env(safe-area-inset-right)',
        '--safe-area-bottom': 'env(safe-area-inset-bottom)',
        '--safe-area-left': 'env(safe-area-inset-left)',
      },
    },
  },
  root: {
    display: 'flex',
    minHeight: '100%',
    position: 'relative',
    flexFlow: 'column nowrap',
    '& > *': { flexShrink: 0 },
    [breakpoints.smDown]: createPadding('1rem'),
    [breakpoints.mdUp]: createPadding('2rem'),
  },
})

export default memo(({ className, children, ...rest }) => {
  const classes = useStyles()

  const cx = useClassNames(() => [
    className, classes.root,
  ], [classes, className])

  return (
    <div className={cx} {...rest}>
      { children }
    </div>
  )
})
