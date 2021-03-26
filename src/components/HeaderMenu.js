import React, { useCallback } from 'react'
import { useModal } from 'hooks'
import Button from 'components/Button'
import { MenuIcon } from 'components/Icons'
import DialogHeaderMenu from 'components/DialogHeaderMenu'

export default () => {
  const { openDialog } = useModal()

  const handleClick = useCallback(() => {
    openDialog(<DialogHeaderMenu />)
  }, [])

  return (
    <Button
      aria-label="Menu"
      icon={<MenuIcon />}
      onClick={handleClick}
    />
  )
}
