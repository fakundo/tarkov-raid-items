import React, { useCallback } from 'react'
import { useLocales, useAppState, useModal, useTheme } from 'hooks'
import Button from 'components/Button'
import Spacer from 'components/Spacer'
import DialogProgressExportLink from 'components/DialogProgressExportLink'

export default () => {
  const theme = useTheme()
  const { __ } = useLocales()
  const { resetProgress } = useAppState()
  const { closeModal } = useModal()

  const handleResetClick = useCallback(() => {
    closeModal(resetProgress)
  }, [])

  return (
    <>
      <b>{__`Share URL`}</b>
      <Spacer small />
      <DialogProgressExportLink />
      <Spacer />
      <Button
        onClick={handleResetClick}
        style={{ color: theme.palette.text.error }}
      >
        {__`Reset progress`}
      </Button>
    </>
  )
}
