import React from 'react'
import { createUseStyles, useLocales } from 'hooks'
import { breakpoints } from 'utils'
import Visible from 'components/Visible'
import Spacer from 'components/Spacer'
import HeaderLegend from 'components/HeaderLegend'
import HeaderActions from 'components/HeaderActions'
import HeaderMenu from 'components/HeaderMenu'

const useStyles = createUseStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    flexFlow: 'row nowrap',
  },
  title: {
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
  actions: {
    flexShrink: 0,
    display: 'flex',
    marginLeft: '0.5rem',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
  },
}))

export default () => {
  const { gettext } = useLocales()
  const classes = useStyles()
  return (
    <>
      <header className={classes.root}>
        <div className={classes.title}>
          <h2>
            Escape from Tarkov
          </h2>
          <h1>
            {gettext('Find in Raid Items')}
          </h1>
        </div>
        <div className={classes.actions}>
          <Visible breakpoint="mdUp">
            <HeaderActions />
            <Visible breakpoint="lg">
              <HeaderLegend />
            </Visible>
          </Visible>
          <Visible breakpoint="smDown">
            <HeaderMenu />
          </Visible>
        </div>
      </header>
      <Visible breakpoint="mdDown">
        <Spacer />
        <HeaderLegend />
      </Visible>
    </>
  )
}
