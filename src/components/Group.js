import React from 'react'
import { createUseStyles, useClassNames } from 'hooks'

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    margin: '-.25rem -.5rem',
    '& > *': {
      flexShrink: 0,
      maxWidth: '100%',
      padding: '.25rem .5rem',
    },
  },
  vertical: {
    flexFlow: 'column',
    alignItems: 'flex-start',
  },
})

export default ({ children, className, vertical }) => {
  const classes = useStyles()

  const cx = useClassNames(() => [
    className,
    classes.root,
    {
      [classes.vertical]: vertical,
    },
  ], [classes, className, vertical])

  return (
    <div className={cx}>
      { children }
    </div>
  )
}
