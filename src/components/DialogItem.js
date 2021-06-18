import React from 'react'
import map from 'lodash/map'
import size from 'lodash/size'
import { useLocales } from 'hooks'
import { hideout, quests, dealers } from 'data'
import { KAPPA } from 'constants/tags'
import Spacer from 'components/Spacer'
import DialogTitle from 'components/DialogTitle'
import Tag from 'components/Tag'
import DialogItemLinkGroup from 'components/DialogItemLinkGroup'

export default ({ item }) => {
  const { locale, __n, __ } = useLocales()
  return (
    <>
      <DialogTitle>
        {item.getName(locale)}
      </DialogTitle>
      <b>
        {__n`Quest``Quests`(size(item.quest))}
      </b>
      <Spacer small />
      <DialogItemLinkGroup
        links={map(item.quest, (amount, questKey) => {
          const quest = quests[questKey]
          const dealer = dealers[quest.dealer]
          return {
            image: dealer.image,
            imageAlt: dealer.getName(locale),
            href: quest.getLink(locale),
            text: quest.getName(locale),
            hints: [
              `(${amount})`,
              !!quest.kappa && <Tag tag={KAPPA} />,
            ],
          }
        })}
      />
      {!!item.reward && (
        <>
          <Spacer />
          <b>
            {__`Reward`}
          </b>
          <Spacer small />
          <DialogItemLinkGroup
            links={map(item.reward, (amount, questKey) => {
              const quest = quests[questKey]
              const dealer = dealers[quest.dealer]
              return {
                image: dealer.image,
                imageAlt: dealer.getName(locale),
                href: quest.getLink(locale),
                text: quest.getName(locale),
                hints: [`(${amount})`],
              }
            })}
          />
        </>
      )}
      {!!item.craft && (
        <>
          <Spacer />
          <b>
            {__`Craft`}
          </b>
          <Spacer small />
          <DialogItemLinkGroup
            links={map(item.craft, (level, moduleKey) => {
              const mod = hideout[moduleKey]
              return {
                image: mod.image,
                imageAlt: mod.getName(locale),
                href: mod.getLink(locale),
                text: mod.getName(locale),
                hints: [`(${__`lvl ${level}`})`],
              }
            })}
          />
        </>
      )}
    </>
  )
}
