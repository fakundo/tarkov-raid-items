import React from 'react'
import { createUseStyles, useSearch } from 'hooks'
import TransitionGroup from 'components/TransitionGroup'
import Fade from 'components/Fade'
import Visible from 'components/Visible'
import Spacer from 'components/Spacer'
import SearchBox from 'components/SearchBox'
import Legend from 'components/Legend'
import HeaderTitle from 'components/HeaderTitle'
import HeaderActions from 'components/HeaderActions'
import HeaderActionsCompact from 'components/HeaderActionsCompact'

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    flexFlow: 'row nowrap',
  },
  actions: {
    flexShrink: 0,
    display: 'flex',
    marginLeft: '0.5rem',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
  },
})

export default () => {
  const { searchBoxOpen } = useSearch()
  const classes = useStyles()
  return (
    <>
      <Visible breakpoint="smDown">
        <TransitionGroup>
          {searchBoxOpen
            ? (
              <Fade key="search">
                <div>
                  <SearchBox />
                </div>
              </Fade>
            )
            : (
              <Fade key="header">
                <div>
                  <header className={classes.root}>
                    <HeaderTitle />
                    <div className={classes.actions}>
                      <HeaderActionsCompact />
                    </div>
                  </header>
                  <Spacer />
                  <Legend />
                </div>
              </Fade>
            )
          }
        </TransitionGroup>
      </Visible>

      <Visible breakpoint="mdUp">
        <header className={classes.root}>
          <HeaderTitle />
          <div className={classes.actions}>
            <TransitionGroup>
              {searchBoxOpen
                ? (
                  <Fade key="search">
                    <SearchBox closeOnBlur />
                  </Fade>
                )
                : (
                  <Fade key="actions">
                    <HeaderActions />
                  </Fade>
                )
              }
            </TransitionGroup>
            <Visible breakpoint="lg">
              <Legend />
            </Visible>
          </div>
        </header>
        <Visible breakpoint="md">
          <Spacer />
          <Legend />
        </Visible>
      </Visible>
    </>
  )
}
