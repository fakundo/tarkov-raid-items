/* eslint-disable no-continue */
/* eslint-disable prefer-destructuring */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const jsdom = require('jsdom')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const renameJson = require('./rename.json')

const WIKI_URL = 'https://escapefromtarkov.fandom.com'
const ALLOWED_LOCALES = ['ru', 'en', 'fr', 'de']
const OUTPUT_PATH = path.resolve(__dirname, '../../src/data')

const writeFile = (filename, content) => {
  fs.writeFileSync(path.resolve(OUTPUT_PATH, filename), JSON.stringify(content, null, '  '))
}

// const makeKey = name => _.upperCase(name).replace(/\s+/g, '_')
const makeKey = name => {
  const key = _.snakeCase(name).toUpperCase()
  return renameJson[key] || key
}

const normalizeUrl = url => (url.startsWith('/') ? `${WIKI_URL}${url}` : url)

const normalizeList = list =>
  Object.keys(list)
    .sort()
    .reduce((acc, key) => {
      acc[key] = list[key]
      return acc
    }, {})

const fetchPageDocument = async pageUrl =>
  new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        console.log('Processing page:', pageUrl)
        const res = await fetch(normalizeUrl(pageUrl)) // eslint-disable-line
        const content = await res.text()
        resolve(new jsdom.JSDOM(content).window.document)
      } catch (error) {
        reject(error)
      }
    }, 10)
  })

const fetchMultiLangDocs = async url => {
  const doc = await fetchPageDocument(url)
  const pages = { en: { url, doc } }
  for (const localeAnchor of doc.querySelectorAll('.page-header__languages .wds-list > li > a')) {
    const langUrl = localeAnchor.getAttribute('href')
    const lang = new URL(langUrl).pathname.split('/')[1]
    if (ALLOWED_LOCALES.includes(lang)) {
      const localePage = await fetchPageDocument(langUrl)
      pages[lang] = { url: langUrl, doc: localePage }
    }
  }
  return pages
}

const parseData = async () => {
  const questsPage = await fetchPageDocument('/wiki/Quests')
  const dealers = {}
  const quests = {}
  const items = {}
  const hideout = {}
  for (const table of questsPage.querySelectorAll('.questtable')) {
    const dealerAnchor = table.querySelector('th a')
    const dealerPages = await fetchMultiLangDocs(dealerAnchor.getAttribute('href'))
    const dealerName = {}
    for (const lang in dealerPages) {
      const name = dealerPages[lang].doc.querySelector('.mw-page-title-main').innerHTML
      if (name !== dealerName.en) {
        dealerName[lang] = name
      }
    }
    const dealerKey = makeKey(dealerName.en)
    dealers[dealerKey] = {
      name: dealerName,
    }
    for (const questRow of table.querySelectorAll('tr:not(:first-child):not(:nth-child(2))')) {
      const questAnchor = questRow.querySelector('a')
      const questPages = await fetchMultiLangDocs(questAnchor.getAttribute('href'))
      const questName = {}
      for (const lang in questPages) {
        const name = questPages[lang].doc.querySelector('.mw-page-title-main').innerHTML
        if (name !== questName.en) {
          questName[lang] = name
        }
      }
      const questKey = makeKey(questName.en)
      quests[questKey] = {
        name: questName,
        link: _.mapValues(questPages, questPage => normalizeUrl(questPage.url)),
        kappa: !!questRow.querySelector('th:last-child [color="red"]'),
        dealer: dealerKey,
      }
      for (const objectiveLi of questRow.querySelectorAll('td:nth-child(2) ul li')) {
        if (!objectiveLi.querySelector('[color="red"]')) continue
        const itemAnchor = objectiveLi.querySelector('a:not(*:has([color="red"]))')
        if (!itemAnchor) continue
        const itemPages = await fetchMultiLangDocs(itemAnchor.getAttribute('href'))
        const itemName = {}
        const itemNameShort = {}
        for (const lang in itemPages) {
          const name = (
            itemPages[lang].doc.querySelector('.mw-page-title-main') ||
            itemPages[lang].doc.querySelector('.page-header__title')
          ).innerHTML
          if (name !== itemName.en) {
            itemName[lang] = name
          }
          const shortNameP = itemPages[lang].doc.querySelector('.mw-parser-output > p')
          if (!shortNameP) continue
          const match = shortNameP.innerHTML.match(/\([^)]+/g)
          if (!match) continue
          const matchName = match.pop().substring(1)
          if (matchName !== itemNameShort.en) {
            itemNameShort[lang] = matchName
          }
        }
        const itemKey = makeKey(itemName.en)
        if (!items[itemKey]) {
          const typeEl =
            itemPages.en.doc.querySelector('.va-infobox-content a') ||
            itemPages.en.doc.querySelector('.va-infobox-content')
          items[itemKey] = {
            type: typeEl ? typeEl.innerHTML : 'Other',
            name: itemName,
            nameShort: itemNameShort,
            quest: {},
          }
          for (const hideoutRow of itemPages.en.doc.querySelectorAll(
            'h2:has(#Crafting) + table tr',
          )) {
            if (!hideoutRow.querySelector('th:last-child .mw-selflink')) continue
            const hideoutAnchor = hideoutRow.querySelector('[title="Hideout"]')
            const level = parseInt(hideoutAnchor.innerHTML.match(/\d+/)[0], 10)
            const hideoutName = {
              en: hideoutAnchor.innerHTML.match(/(.*?)\slevel/)[1],
            }
            const hideoutLink = {
              en: normalizeUrl(hideoutAnchor.getAttribute('href')),
            }
            const hideoutKey = makeKey(hideoutName.en)
            hideout[hideoutKey] = hideout[hideoutKey] || {
              name: hideoutName,
              link: hideoutLink,
            }
            items[itemKey].craft = items[itemKey].craft || {}
            items[itemKey].craft[hideoutKey] = level
          }
          for (const rewardLi of itemPages.en.doc.querySelectorAll(
            'h2:has(#Quest_rewards) + ul li',
          )) {
            const amount = parseInt(rewardLi.innerHTML.match(/\d+/)[0], 10)
            const rewardAnchor = rewardLi.querySelector('a')
            const rewardPages = await fetchMultiLangDocs(rewardAnchor.getAttribute('href'))
            const rewardKey = makeKey(
              rewardPages.en.doc.querySelector('.mw-page-title-main').innerHTML,
            )
            items[itemKey].reward = items[itemKey].reward || {}
            items[itemKey].reward[rewardKey] = amount
          }
        }
        const amountMatch = objectiveLi.innerHTML.match(/\d+/)
        items[itemKey].quest[questKey] = amountMatch ? parseInt(amountMatch[0], 10) : 1
      }
    }
  }

  return {
    dealers: normalizeList(dealers),
    hideout: normalizeList(hideout),
    items: normalizeList(items),
    quests: normalizeList(
      _.pickBy(quests, (quest, key) =>
        _.some(items, item => item.quest[key] || (item.reward && item.reward[key])),
      ),
    ),
  }
}

const run = async () => {
  const data = await parseData()
  writeFile('hideout.json', data.hideout)
  writeFile('dealers.json', data.dealers)
  writeFile('quests.json', data.quests)
  writeFile('items.json', data.items)
}

run()
