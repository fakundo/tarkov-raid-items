import React, { Fragment } from 'react'
import { createUseStyles, useLocales } from 'hooks'
import Link from 'components/Link'

const useStyles = createUseStyles((theme) => ({
  root: {
    color: theme.palette.text.muted,
  },
}))

export default () => {
  const classes = useStyles()
  const { gettext } = useLocales()
  return (
    <div className={classes.root}>
      { gettext('All images are copyrighted by BattleState Games.') }
      { ' ' }
      { gettext('Data taken from the [URL] under [URL] license.')
        .split('[URL]')
        .map((chunk, index) => (
          <Fragment key={chunk}>
            { chunk }
            { index === 0 && (
              <Link href="https://escapefromtarkov.gamepedia.com/">
                Escape from Tarkov Wiki
              </Link>
            ) }
            { index === 1 && (
              <Link href="https://www.fandom.com/licensing">
                CC BY-NC-SA 3.0
              </Link>
            ) }
          </Fragment>
        ))
      }
    </div>
  )
}
