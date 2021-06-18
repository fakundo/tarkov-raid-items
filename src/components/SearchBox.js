import React, { useCallback } from 'react'
import { useLocales, useSearch, createUseStyles } from 'hooks'
import { breakpoints } from 'utils'
import debounce from 'lodash/debounce'
import Button from 'components/Button'
import Group from 'components/Group'
import Input from 'components/Input'
import { SearchIcon, CloseIcon } from 'components/Icons'

const useStyles = createUseStyles({
  root: {
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inputWrapper: {
    [breakpoints.smDown]: { flex: 1 },
  },
  input: {
    [breakpoints.mdUp]: { width: 250 },
  },
})

export default ({ closeOnBlur }) => {
  const { searchTerm, closeSearchBox, updateSearchTerm } = useSearch()
  const { __ } = useLocales()
  const classes = useStyles()

  const handleBlur = useCallback((ev) => {
    const { value } = ev.target
    if (!value && closeOnBlur) {
      closeSearchBox()
    }
  }, [closeOnBlur])

  const handleChange = useCallback(debounce((ev) => {
    const { value } = ev.target
    updateSearchTerm(value)
  }, 250), [])

  const handleKeyDown = useCallback((ev) => {
    if (ev.key === 'Enter') {
      const { value } = ev.target
      handleChange.cancel()
      updateSearchTerm(value)
    }
    if (ev.key === 'Escape' && closeOnBlur) {
      handleChange.cancel()
      closeSearchBox()
    }
  }, [])

  return (
    <Group className={classes.root}>
      <div>
        <SearchIcon />
      </div>
      <div className={classes.inputWrapper}>
        <Input
          autoFocus
          defaultValue={searchTerm}
          className={classes.input}
          placeholder={__`Enter item name here...`}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button
        aria-label="Close"
        icon={<CloseIcon />}
        onClick={closeSearchBox}
      />
    </Group>
  )
}
