import React, { useCallback } from 'react'
import { useModal } from 'hooks'
import Group from 'components/Group'
import Button from 'components/Button'
import SearchButton from 'components/SearchButton'
import { MenuIcon } from 'components/Icons'
import DialogHeaderMenu from 'components/DialogHeaderMenu'

export default () => {
  const { openDialog } = useModal()

  const handleMenuClick = useCallback(() => {
    openDialog(<DialogHeaderMenu />)
  }, [])

  return (
    <Group>
      <SearchButton
        aria-label="Search"
      />
      <Button
        aria-label="Menu"
        icon={<MenuIcon />}
        onClick={handleMenuClick}
      />
    </Group>
  )
}
