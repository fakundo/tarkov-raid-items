/* eslint-disable import/no-dynamic-require, global-require */
import mapValues from 'lodash/mapValues'
import orderBy from 'lodash/orderBy'
import map from 'lodash/map'
import dealersJson from './dealers.json'
import hideoutJson from './hideout.json'
import questsJson from './quests.json'
import itemsJson from './items.json'

export const quests = mapValues(questsJson, quest => ({
  getName: locale => quest.name[locale] || quest.name.en,
  getLink: locale => quest.link[locale] || quest.link.en,
  ...quest,
}))

export const hideout = mapValues(hideoutJson, (module, key) => ({
  image: require(`assets/hideout/${key}.png?as=webp`).default,
  getName: locale => module.name[locale] || module.name.en,
  getLink: locale => module.link[locale] || module.link.en,
  ...module,
}))

export const dealers = mapValues(dealersJson, (dealer, key) => ({
  image: require(`assets/dealers/${key}.png?as=webp`).default,
  getName: locale => dealer.name[locale] || dealer.name.en,
  ...dealer,
}))

export const items = mapValues(itemsJson, (item, key) => ({
  getNameShort: locale => item.nameShort[locale] || item.nameShort.en,
  getName: locale => item.name[locale] || item.name.en,
  image: require(`assets/items/${key}.png?as=webp`).default,
  ...item,
}))

export const itemsSorted = orderBy(
  map(items, (item, key) => ({ ...item, key })),
  ['type', 'nameShort.en'],
)
