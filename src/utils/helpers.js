import some from 'lodash/some'
import filter from 'lodash/filter'
import includes from 'lodash/includes'
import reduce from 'lodash/reduce'
import clamp from 'lodash/clamp'
import isBoolean from 'lodash/isBoolean'
import pick from 'lodash/pick'
import { DONE, CRAFT, REWARD, KAPPA } from 'constants/tags'
import { items } from 'data'

const stringifyStateFields = ['filter', 'counters']

export const checkFilterValue = (filterValue, itemValue) => (
  !isBoolean(filterValue) || filterValue === itemValue
)

export const getFilterCount = (filterObj) => (
  filter(filterObj, isBoolean).length
)

export const checkFilter = (filterObj, { done, craft, reward, kappa }) => (
  checkFilterValue(filterObj[DONE], done)
  && checkFilterValue(filterObj[CRAFT], craft)
  && checkFilterValue(filterObj[REWARD], reward)
  && checkFilterValue(filterObj[KAPPA], kappa)
)

const checkItemNameObject = (term, nameObj) => (
  some(nameObj, (name) => includes(name.toLowerCase(), term))
)

export const checkSearchTerm = (searchTerm, item) => {
  const term = searchTerm.toLowerCase()
  return checkItemNameObject(term, item.nameShort)
    || checkItemNameObject(term, item.name)
}

export const calculateProgress = (counters) => {
  const { total, found } = reduce(items, (acc, item, key) => {
    const itemAmount = reduce(item.quest, (amountAcc, amount) => (amountAcc + amount), 0)
    const itemFound = clamp(counters?.[key] || 0, 0, itemAmount)
    return {
      total: (acc.total || 0) + itemAmount,
      found: (acc.found || 0) + itemFound,
    }
  }, {})
  return { found, total }
}

export const updateAppStateCounters = (appState, itemKey, value) => {
  const counters = { ...appState.counters }
  if (value) {
    counters[itemKey] = value
  } else {
    delete counters[itemKey]
  }
  return { ...appState, counters }
}

export const unstringifyState = (str) => {
  try {
    const data = JSON.parse(str)
    return pick(data, stringifyStateFields)
  } catch {
    return {}
  }
}

export const stringifyState = (state) => {
  try {
    const data = pick(state, stringifyStateFields)
    return JSON.stringify(data)
  } catch {
    return ''
  }
}

export const createStateExportLink = (state) => {
  const url = new URL(`${window.location.origin}${window.location.pathname}`)
  url.hash = stringifyState(state)
  return url.toString()
}
