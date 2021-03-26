import React from 'react'
import map from 'lodash/map'
import { useAppState, useModal, useLocales } from 'hooks'
import DialogTitle from 'components/DialogTitle'
import Button from 'components/Button'
import Group from 'components/Group'
import * as locales from 'locales'

export default () => {
  const { gettext } = useLocales()
  const { closeModal } = useModal()
  const { updateLocale } = useAppState()
  return (
    <>
      <DialogTitle>
        { gettext('Select language') }
      </DialogTitle>
      <Group vertical>
        { map(locales, (locale, key) => (
          <Button
            key={key}
            onClick={() => {
              closeModal()
              setTimeout(updateLocale, 0, key)
            }}
          >
            { locale.extraProps.name }
          </Button>
        )) }
      </Group>
    </>
  )
}
