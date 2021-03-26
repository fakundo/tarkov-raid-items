import React from 'react'
import { useLocales, useAppState, useModal } from 'hooks'
import DialogTitle from 'components/DialogTitle'
import Button from 'components/Button'
import Group from 'components/Group'
import DialogFilter from 'components/DialogFilter'
import DialogLocale from 'components/DialogLocale'
import DialogProgress from 'components/DialogProgress'
import { FilterIcon, LanguageIcon, CheckCircleOutlineIcon } from 'components/Icons'

export default () => {
  const { gettext } = useLocales()
  const { progress, filterCount } = useAppState()
  const { openDialog } = useModal()

  const buttons = [
    {
      icon: <CheckCircleOutlineIcon />,
      children: `${gettext('Progress')} (${((progress.found / progress.total) * 100).toFixed(2)}%)`,
      onClick: () => openDialog(<DialogProgress />),
    },
    {
      icon: <FilterIcon />,
      children: `${gettext('Filter')}${filterCount ? ` (${filterCount})` : ''}`,
      onClick: () => openDialog(<DialogFilter />),
    },
    {
      icon: <LanguageIcon />,
      children: gettext('Select language'),
      onClick: () => openDialog(<DialogLocale />),
    },
  ]

  return (
    <>
      <DialogTitle>
        { gettext('Settings') }
      </DialogTitle>
      <Group vertical>
        { buttons.map((button) => (
          <Button
            key={button.children}
            {...button}
          />
        )) }
      </Group>
    </>
  )
}
