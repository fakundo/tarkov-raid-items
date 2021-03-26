import React, { useCallback, useState, useEffect } from 'react'
import debounce from 'lodash/debounce'
import { useAppState } from 'hooks'
import { checkFilterValue } from 'utils'
import Checkbox from 'components/Checkbox'
import Group from 'components/Group'
import { VisibilityIcon, VisibilityOffIcon } from 'components/Icons'

export default ({ filterKey, labelTrue, labelFalse }) => {
  const { filter, updateFilter } = useAppState()
  const [value, setValue] = useState(filter[filterKey])

  useEffect(() => {
    setValue(filter[filterKey])
  }, [filter[filterKey]])

  const updateFilterDebounced = useCallback((
    debounce(updateFilter, 50)
  ), [updateFilter])

  const options = [
    { optionValue: true, label: labelTrue },
    { optionValue: false, label: labelFalse },
  ]

  return (
    <Group vertical>
      { options.map(({ optionValue, label }) => (
        <Checkbox
          label={label}
          key={optionValue}
          iconCheck={<VisibilityIcon />}
          iconUncheck={<VisibilityOffIcon />}
          checked={checkFilterValue(value, optionValue)}
          onChange={(ev) => {
            const nextValue = ev.target.checked ? undefined : !optionValue
            setValue(nextValue)
            updateFilterDebounced({ ...filter, [filterKey]: nextValue })
          }}
        />
      )) }
    </Group>
  )
}
