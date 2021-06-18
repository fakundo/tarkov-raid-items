import React from 'react'
import map from 'lodash/map'
import { useAppState, useModal, useLocales } from 'hooks'
import DialogTitle from 'components/DialogTitle'
import Button from 'components/Button'
import Group from 'components/Group'
import * as locales from 'locales'

export default () => {
  const { __ } = useLocales()
  const { closeModal } = useModal()
  const { updateLocale } = useAppState()
  return (
    <>
      <DialogTitle>
        {__`Select language`}
      </DialogTitle>
      <Group vertical>
        {map(locales, (locale, key) => (
          <Button
            key={key}
            onClick={() => {
              closeModal()
              setTimeout(updateLocale, 0, key)
            }}
          >
            {locale.extra.name}
          </Button>
        ))}
      </Group>
    </>
  )
}
