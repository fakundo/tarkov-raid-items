import React from 'react'
import { createUseStyles } from 'hooks'

const useStyles = createUseStyles((theme) => ({
  root: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    padding: [0, '1rem', '1rem', 0],
    color: theme.palette.text.muted,
  },
}))

export default (props) => {
  const classes = useStyles()
  return (
    <div
      {...props}
      className={classes.root}
    />
  )
}
