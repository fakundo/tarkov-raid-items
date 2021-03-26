import React, { memo } from 'react'
import { createUseStyles, useClassNames } from 'hooks'

const useStyles = createUseStyles({
  root: {
    width: 24,
    height: 24,
    display: 'block',
  },
})

export default memo(({ className, viewBox, id }) => {
  const classes = useStyles()

  const cx = useClassNames(() => [
    className, classes.root,
  ], [classes, className])

  return (
    <svg className={cx} viewBox={viewBox}>
      <use xlinkHref={`#${id}`} />
    </svg>
  )
})
