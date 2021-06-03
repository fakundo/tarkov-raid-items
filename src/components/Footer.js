import React, { Fragment } from 'react'
import { createUseStyles, useLocales } from 'hooks'
import { breakpoints } from 'utils'
import Link from 'components/Link'
import Spacer from 'components/Spacer'

const useStyles = createUseStyles((theme) => ({
  root: {
    color: theme.palette.text.muted,
    [breakpoints.mdUp]: {
      whiteSpace: 'pre-wrap',
    },
  },
}))

export default () => {
  const classes = useStyles()
  const { gettext } = useLocales()
  return (
    <div className={classes.root}>
      {gettext('An interactive list of items that must have the «Item found in raid» mark, and which are required to complete the quests.')}
      {'\r\n'}
      {gettext('The main reward after completing (almost) all quests in the game is a Kappa secure container.')}
      {'\r\n'}
      {gettext('The mark «Item found in raid» is given to items that were created in the Hideout, or obtained as a quest reward, or found during the game if the player survived.')}
      {'\r\n'}
      {gettext('Items with only this mark can be sold at the Flea market, and the item loses the mark after being sold.')}
      <Spacer />
      <span data-nosnippet>
        {gettext('All images are copyrighted by BattleState Games.')}
        {'\r\n'}
        {gettext('Data taken from the [URL] under [URL] license.')
          .split('[URL]')
          .map((chunk, index) => (
            <Fragment key={chunk}>
              {chunk}
              {index === 0 && (
                <Link href="https://escapefromtarkov.gamepedia.com/">
                  Escape from Tarkov Wiki
                </Link>
              )}
              {index === 1 && (
                <Link href="https://www.fandom.com/licensing">
                  CC BY-NC-SA 3.0
                </Link>
              )}
            </Fragment>
          ))
        }
      </span>
    </div>
  )
}
