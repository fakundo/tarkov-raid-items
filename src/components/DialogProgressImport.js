import React, { useCallback } from 'react'
import { useLocales, useAppState, useModal, useTheme } from 'hooks'
import Group from 'components/Group'
import Button from 'components/Button'
import Spacer from 'components/Spacer'

export default () => {
  const theme = useTheme()
  const { __ } = useLocales()
  const { importState, rejectImport } = useAppState()
  const { closeModal } = useModal()

  const handleImport = useCallback(() => {
    closeModal()
    setTimeout(importState)
  }, [])

  const handleImportReject = useCallback(() => {
    closeModal()
    setTimeout(rejectImport)
  }, [])

  return (
    <>
      {__`When importing progress from the current URL`}
      {', '}
      <b>{__`your previously saved progress will be erased`}</b>
      <Spacer />
      <Group>
        <Button
          onClick={handleImport}
          style={{ color: theme.palette.text.error }}
        >
          {__`Import progress from URL`}
        </Button>
        <Button
          onClick={handleImportReject}
          style={{ color: theme.palette.text.muted }}
        >
          {__`Return to your progress`}
        </Button>
      </Group>
    </>
  )
}
