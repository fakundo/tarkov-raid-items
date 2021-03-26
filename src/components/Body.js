import React from 'react'
import { createUseStyles } from 'hooks'

const useStyles = createUseStyles({
  root: {
    flex: 1,
  },
})

export default ({ children }) => {
  const classes = useStyles()
  return (
    <main className={classes.root}>
      { children }
    </main>
  )
}
