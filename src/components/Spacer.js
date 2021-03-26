import React, { memo } from 'react'
import { createUseStyles, useClassNames } from 'hooks'

const useStyles = createUseStyles({
  default: {
    height: '1rem',
  },
  small: {
    height: '.5rem',
  },
  large: {
    height: '1.5rem',
  },
})

export default memo(({ small, large }) => {
  const classes = useStyles()

  const cx = useClassNames(() => [
    {
      [classes.small]: small,
      [classes.large]: large,
      [classes.default]: !small && !large,
    },
  ], [classes, small, large])

  return (
    <div className={cx} />
  )
})
