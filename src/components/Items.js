import React from 'react'
import reduce from 'lodash/reduce'
import clamp from 'lodash/clamp'
import { useAppState, useLocales, useSearch } from 'hooks'
import { checkFilter, checkSearchTerm } from 'utils'
import { quests, itemsSorted } from 'data'
import TransitionGroup from 'components/TransitionGroup'
import Fade from 'components/Fade'
import Item from 'components/Item'
import ItemsBanner from 'components/ItemsBanner'
import ItemsVariant from 'components/ItemsVariant'

export default () => {
  const { __ } = useLocales()
  const { searchBoxOpen, searchTerm, closeSearchBox } = useSearch()
  const { progress, counters, filter, itemsIdempotencyKey,
    resetProgress, updateCounter, updateFilter } = useAppState()

  const search = searchBoxOpen && !!searchTerm

  const children = reduce(itemsSorted, (acc, item) => {
    const { amountNeed, kappa } = reduce(item.quest, (acc2, amount, questKey) => ({
      amountNeed: (acc2.amountNeed || 0) + amount,
      kappa: (acc2.kappa || quests[questKey].kappa),
    }), {})

    const amountFound = clamp(counters[item.key] || 0, 0, amountNeed)
    const done = amountFound === amountNeed
    const reward = !!item.reward
    const craft = !!item.craft

    if (
      search
        ? checkSearchTerm(searchTerm, item)
        : checkFilter(filter, { done, craft, reward, kappa })
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
  const itemsKey = itemsIdempotencyKey + (search ? searchTerm : '')

  return (
    <TransitionGroup>
      {!empty && (
        <Fade key={itemsKey}>
          <ItemsVariant>
            {children}
          </ItemsVariant>
        </Fade>
      )}
      {empty && search && (
        <Fade key="search">
          <div>
            <ItemsBanner
              text={__`Nothing to display...`}
              buttonText={__`Reset search`}
              onReset={() => closeSearchBox()}
            />
          </div>
        </Fade>
      )}
      {empty && !search && allDone && (
        <Fade key="done">
          <div>
            <ItemsBanner
              text={__`Looks like you've found all the items! Enjoy your Kappa!`}
              buttonText={__`Reset progress`}
              onReset={() => resetProgress()}
            />
          </div>
        </Fade>
      )}
      {empty && !search && !allDone && (
        <Fade key="empty">
          <div>
            <ItemsBanner
              text={__`Nothing to display...`}
              buttonText={__`Reset filter`}
              onReset={() => updateFilter({})}
            />
          </div>
        </Fade>
      )}
    </TransitionGroup>
  )
}
