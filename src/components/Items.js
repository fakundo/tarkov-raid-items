import React from 'react'
import reduce from 'lodash/reduce'
import clamp from 'lodash/clamp'
import { createUseStyles, useAppState, useLocales } from 'hooks'
import { DONE, CRAFT, REWARD, KAPPA } from 'constants/tags'
import { checkFilterValue } from 'utils'
import { quests, itemsSorted } from 'data'
import TransitionGroup from 'components/TransitionGroup'
import Fade from 'components/Fade'
import Item from 'components/Item'
import Button from 'components/Button'
import Spacer from 'components/Spacer'
import ItemsVariant from 'components/ItemsVariant'

const useStyles = createUseStyles((theme) => ({
  empty: {
    padding: '2rem',
    fontSize: '1.5rem',
    borderRadius: '1rem',
    display: 'inline-block',
    boxShadow: theme.shadow.card,
    background: theme.palette.background.card,
  },
  allDone: {
    extend: 'empty',
  },
  resetButton: {
    color: theme.palette.text.error,
  },
}))

export default () => {
  const classes = useStyles()
  const { gettext } = useLocales()
  const { progress, counters, filter, filterKey,
    resetProgress, updateCounter, updateFilter } = useAppState()

  const children = reduce(itemsSorted, (acc, item) => {
    const { amountNeed, kappa } = reduce(item.quest, (acc2, amount, questKey) => ({
      amountNeed: (acc2.amountNeed || 0) + amount,
      kappa: (acc2.kappa || quests[questKey].kappa),
    }), {})

    const amountFound = clamp(counters[item.key] || 0, 0, amountNeed)
    const done = amountFound === amountNeed
    const craft = !!item.craft
    const reward = !!item.reward

    if (
      checkFilterValue(filter[DONE], done)
      && checkFilterValue(filter[CRAFT], craft)
      && checkFilterValue(filter[REWARD], reward)
      && checkFilterValue(filter[KAPPA], kappa)
    ) {
      acc.push((
        <Fade key={item.key}>
          <Item
            {...{ item, amountNeed, amountFound }}
            {...{ done, craft, reward, kappa, updateCounter }}
          />
        </Fade>
      ))
    }

    return acc
  }, [])

  const empty = !children.length
  const allDone = progress.found === progress.total

  return (
    <TransitionGroup>
      { !empty && (
        <Fade key={filterKey}>
          <ItemsVariant>
            { children }
          </ItemsVariant>
        </Fade>
      ) }
      { empty && allDone && (
        <Fade>
          <div className={classes.allDone}>
            { gettext('Looks like you\'ve found all the items! Enjoy your Kappa!') }
            <Spacer />
            <Button
              className={classes.resetButton}
              onClick={() => resetProgress()}
            >
              { gettext('Reset progress') }
            </Button>
          </div>
        </Fade>
      ) }
      { empty && !allDone && (
        <Fade>
          <div className={classes.empty}>
            { gettext('Nothing to display...') }
            <Spacer />
            <Button
              className={classes.resetButton}
              onClick={() => updateFilter({})}
            >
              { gettext('Reset filter') }
            </Button>
          </div>
        </Fade>
      ) }
    </TransitionGroup>
  )
}
