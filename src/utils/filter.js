import some from 'lodash/some'
import filter from 'lodash/filter'
import includes from 'lodash/includes'
import isBoolean from 'lodash/isBoolean'
import { DONE, CRAFT, REWARD, KAPPA } from 'constants/tags'

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

const checkName = (term, nameObj) => (
  some(nameObj, (name) => includes(name.toLowerCase(), term))
)

export const checkSearchTerm = (searchTerm, item) => {
  const term = searchTerm.toLowerCase()
  return checkName(term, item.nameShort) || checkName(term, item.name)
}
