import React, { memo } from 'react'
import { createUseStyles, useClassNames } from 'hooks'
import { createTransition } from 'utils'

const useStyles = createUseStyles((theme) => ({
  root: {
    ...createTransition(theme, 'opacity', 'fast'),
    fontSize: '1rem',
    cursor: 'pointer',
    appearance: 'none',
    fontWeight: 'normal',
    textDecoration: 'underline',
    color: theme.palette.text.link,
    '&:hover': {
      opacity: 0.6,
    },
  },
}))

export default memo(({ className, ...rest }) => {
  const classes = useStyles()

  const cx = useClassNames(() => [
    className, classes.root,
  ], [classes, className])

  return (
    <a // eslint-disable-line
      tabIndex="-1"
      className={cx}
      {...rest}
    />
  )
})
