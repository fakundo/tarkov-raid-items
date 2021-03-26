import React, { memo } from 'react'
import { createUseStyles } from 'hooks'
import TransitionGroup from 'components/TransitionGroup'

const useStyles = createUseStyles({
  grid: {
    margin: 0,
    padding: 0,
    display: 'grid',
    gridGap: '1rem',
    cursor: 'pointer',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  },
})

export default memo(({ children }) => {
  const classes = useStyles()
  return (
    <ul className={classes.grid}>
      <TransitionGroup exit>
        { children }
      </TransitionGroup>
    </ul>
  )
})
