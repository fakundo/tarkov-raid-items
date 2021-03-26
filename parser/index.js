/* eslint-disable no-multi-assign, no-restricted-syntax, no-await-in-loop, max-len  */

const fs = require('fs')
const path = require('path')
const http = require('http')
const _ = require('lodash')

const host = 'escapefromtarkov.gamepedia.com'

const makeKey = (name) => (
  _.upperCase(name).replace(/\s+/g, '_')
)

const retrievePage = (options) => new Promise((resolve) => {
  setTimeout(() => {
    http.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        if (!data && res.headers.location) {
          const { hostname, pathname } = new URL(res.headers.location)
          retrievePage({ hostname, path: pathname }).then(resolve)
        } else {
          resolve(data)
        }
      })
    }).end()
  }, 0)
})

const retrieveItemList = async () => {
  const pathname = '/Found_in_raid'
  console.log(`[.] Retrieve item list: ${pathname}`)
  const content = await retrievePage({ host, path: pathname })
  const items = []
  const rows = content.match(/<tr>.+?<\/tr>/sg)
  rows.forEach((row) => {
    const item = {}
    const cols = row.match(/<td>.+?<\/td>/sg)
    item.image = cols?.[0].match(/src="(.+?)"/)?.[1]
    if (!item.image) return
    item.name = _.unescape(cols[1].match(/">(.+?)</)?.[1])
    item.path = cols[1].match(/href="(.+?)"/)?.[1]
    item.craft = cols[2].match(/">(.+?)</)?.[1]
    item.reward = cols[3].match(/href=".+?".+?\)/g)?.map((entry) => {
      const [, link, amount] = entry.match(/href="(.+?)".+?\((.+?)\)/)
      return [link, amount]
    })
    item.kappa = cols[4].match(/>(\w+)/)?.[1]
    item.amount = cols[5].match(/>(\w+)/)?.[1]
    item.quest = cols[6].match(/href="(.+?)"/)?.[1]
    items.push(item)
  })
  return items
}

const retrieveQuest = async (pathname) => {
  console.log(`[.] Retrieve quest: ${pathname}`)
  const content = await retrievePage({ host, path: pathname })
  const quest = { name: {}, link: {} }
  quest.name.en = _.unescape(content.match(/itemprop="name">(.+)<\/h1>/)?.[1])
  quest.link.en = `https://${host}${pathname}`
  quest.dealer = content.match(/Given By.+?href="(.+?)"/)?.[1]
  quest.kappa = content.match(/Required for.+?<font.+?>(\w+)/)?.[1]
  const langEntries = content.match(/interlanguage-link\s.+?href=".+?"/g)
  for (const langEntry of langEntries || []) {
    const [, lang, langPath] = langEntry.match(/interwiki-(.+?)".+href="(.+?)"/)
    const langContent = await retrievePage({ host, path: langPath })
    quest.name[lang] = _.unescape(langContent.match(/itemprop="name">(.+)<\/h1>/)?.[1])
    quest.link[lang] = langPath
    if (!quest.name[lang] || quest.name[lang] === quest.name.en) {
      delete quest.name[lang]
    }
  }
  return quest
}

const retrieveDealer = async (pathname) => {
  console.log(`[.] Retrieve dealer: ${pathname}`)
  const content = await retrievePage({ host, path: pathname })
  const dealer = { name: {} }
  dealer.name.en = _.unescape(content.match(/itemprop="name">(.+)<\/h1>/)?.[1])
  const langEntries = content.match(/interlanguage-link\s.+?href=".+?"/g)
  for (const langEntry of langEntries || []) {
    const [, lang, langPath] = langEntry.match(/interwiki-(.+?)".+href="(.+?)"/)
    const langContent = await retrievePage({ host, path: langPath })
    dealer.name[lang] = _.unescape(langContent.match(/itemprop="name">(.+)<\/h1>/)?.[1])
    if (!dealer.name[lang] || dealer.name[lang] === dealer.name.en) {
      delete dealer.name[lang]
    }
  }
  return dealer
}

const retrieveItem = async (pathname) => {
  console.log(`[.] Retrieve item: ${pathname}`)
  const content = await retrievePage({ host, path: pathname })
  const item = { name: {}, nameShort: {} }
  const [, name, nameShort] = content.match(/<b>(.+?)<\/b>.+?\((.+?)\)\s/)
  item.name.en = _.unescape(name)
  item.nameShort.en = _.unescape(nameShort)
  item.type = content.match(/Type.+?va-infobox-content.+?><a.+?>(.+?)</)?.[1]
    || content.match(/Type.+?va-infobox-content.+?>(.+?)</)?.[1]
  const langEntries = content.match(/interlanguage-link\s.+?href=".+?"/g)
  for (const langEntry of langEntries || []) {
    const [, lang, langUrl] = langEntry.match(/interwiki-(.+?)".+href="(.+?)"/)
    const url = new URL(langUrl)
    const langContent = await retrievePage({ host: url.hostname, path: url.pathname })
    const [, nameLang, nameShortLang] = langContent.match(/<b>(.+?)<\/b>.+?\((.+?)\)\s/) || []
    item.name[lang] = _.unescape(nameLang)
    item.nameShort[lang] = _.unescape(nameShortLang)
    if (!item.name[lang] || item.name[lang] === item.name.en) {
      delete item.name[lang]
    }
    if (!item.nameShort[lang] || item.nameShort[lang] === item.nameShort.en) {
      delete item.nameShort[lang]
    }
  }
  return item
}

const makeData = async () => {
  const itemList = await retrieveItemList()
  const cache = {}
  const dealers = {}
  const hideout = {}
  const quests = {}
  const items = {}

  const addDealer = async (pathname) => {
    const data = cache[pathname] = cache[pathname] || await retrieveDealer(pathname)
    const key = makeKey(data.name.en)
    dealers[key] = {
      ...data,
    }
    return key
  }

  const addQuest = async (pathname) => {
    const data = cache[pathname] = cache[pathname] || await retrieveQuest(pathname)
    const key = makeKey(data.name.en)
    quests[key] = {
      name: data.name,
      link: data.link,
      kappa: data.kappa === 'Yes',
      dealer: await addDealer(data.dealer),
    }
    return key
  }

  const addModule = async (name) => {
    const key = makeKey(name)
    hideout[key] = {
      name: {
        en: name,
      },
      link: {
        en: `https://${host}/Hideout`,
      },
    }
    return key
  }

  for (let i = 0; i < itemList.length; i++) {
    console.log(`[.] Processing item: ${i + 1} / ${itemList.length}`)

    const rawItem = itemList[i]
    const key = makeKey(rawItem.name)
    const item = items[key] = items[key] || {}

    const data = cache[rawItem.path] = cache[rawItem.path] || await retrieveItem(rawItem.path)
    item.type = data.type
    item.name = data.name
    item.nameShort = data.nameShort

    item.quest = {
      ...item.quest || {},
      [await addQuest(rawItem.quest)]: _.toInteger(rawItem.amount),
    }

    const [modName, modLevel] = rawItem.craft.split('lv.').map(_.trim)
    if (modLevel) {
      item.craft = {
        [await addModule(modName)]: _.toInteger(modLevel),
      }
    }

    for (const [rewardQuest, rewardAmount] of rawItem.reward || []) {
      item.reward = {
        ...item.reward || {},
        [await addQuest(rewardQuest)]: _.toInteger(rewardAmount),
      }
    }
  }

  return { hideout, dealers, quests, items }
}

const run = async () => {
  const data = await makeData()
  fs.writeFileSync(
    path.resolve(__dirname, '../src/data/hideout.json'),
    JSON.stringify(data.hideout, null, '  '),
  )
  fs.writeFileSync(
    path.resolve(__dirname, '../src/data/dealers.json'),
    JSON.stringify(data.dealers, null, '  '),
  )
  fs.writeFileSync(
    path.resolve(__dirname, '../src/data/quests.json'),
    JSON.stringify(data.quests, null, '  '),
  )
  fs.writeFileSync(
    path.resolve(__dirname, '../src/data/items.json'),
    JSON.stringify(data.items, null, '  '),
  )
}

run()
