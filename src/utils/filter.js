import filter from 'lodash/filter'
import isBoolean from 'lodash/isBoolean'

export const checkFilterValue = (filterValue, itemValue) => (
  !isBoolean(filterValue) || filterValue === itemValue
)

export const getFilterCount = (filterObj) => (
  filter(filterObj, isBoolean).length
)
