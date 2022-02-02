import React from 'react'
import { useLocales, useAppState, useModal } from 'hooks'
import DialogTitle from 'components/DialogTitle'
import Button from 'components/Button'
import Group from 'components/Group'
import DialogFilter from 'components/DialogFilter'
import DialogLocale from 'components/DialogLocale'
import DialogProgress from 'components/DialogProgress'
import { FilterIcon, LanguageIcon } from 'components/Icons'
import ProgressIcon from 'components/ProgressIcon'

export default () => {
  const { __ } = useLocales()
  const { progress, filterCount } = useAppState()
  const { openDialog } = useModal()

  const buttons = [
    {
      icon: <ProgressIcon />,
      children: `${__`Progress`} (${((progress.found / progress.total) * 100).toFixed(2)}%)`,
      onClick: () => openDialog(<DialogProgress />),
    },
    {
      icon: <FilterIcon />,
      children: `${__`Filter`}${filterCount ? ` (${filterCount})` : ''}`,
      onClick: () => openDialog(<DialogFilter />),
    },
    {
      icon: <LanguageIcon />,
      children: __`Select language`,
      onClick: () => openDialog(<DialogLocale />),
    },
  ]

  return (
    <>
      <DialogTitle>
        {__`Settings`}
      </DialogTitle>
      <Group vertical>
        {buttons.map((button) => (
          <Button
            key={button.children}
            {...button}
          />
        ))}
      </Group>
    </>
  )
}
