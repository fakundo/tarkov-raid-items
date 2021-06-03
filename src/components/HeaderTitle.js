import React from 'react'
import { createUseStyles, useLocales } from 'hooks'
import { breakpoints } from 'utils'

const useStyles = createUseStyles((theme) => ({
  root: {
    display: 'flex',
    flex: '1 1 auto',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    '& > *': {
      margin: 0,
      padding: 0,
      flexShrink: 0,
      lineHeight: 1,
    },
    '& > h1': {
      [breakpoints.xs]: { fontSize: '1rem' },
      [breakpoints.sm]: { fontSize: '1.5rem' },
      [breakpoints.mdUp]: { fontSize: '2rem' },
      fontWeight: 'bold',
    },
    '& > h2': {
      fontSize: '1rem',
      fontWeight: 'bold',
      marginBottom: '.25rem',
      color: theme.palette.text.muted,
    },
  },
}))

export default () => {
  const { gettext } = useLocales()
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h2>
        Escape from Tarkov – EFT
      </h2>
      <h1>
        {gettext('Find in Raid Items')}
      </h1>
    </div>
  )
}
