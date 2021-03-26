import React, { useCallback } from 'react'
import { useLocales, useAppState, useModal, useTheme } from 'hooks'
import DialogTitle from 'components/DialogTitle'
import Button from 'components/Button'
import Spacer from 'components/Spacer'

export default () => {
  const theme = useTheme()
  const { ngettext, gettext } = useLocales()
  const { resetProgress, progress } = useAppState()
  const { closeModal } = useModal()

  const handleResetClick = useCallback(() => {
    closeModal()
    setTimeout(resetProgress)
  }, [])

  return (
    <>
      <DialogTitle>
        { gettext('Progress') }
      </DialogTitle>
      { ngettext('Found %s item of %s', 'Found %s items of %s', progress.found, progress.found, progress.total) }
      <b>
        {` (${((progress.found / progress.total) * 100).toFixed(2)}%)`}
      </b>
      <Spacer />
      <Button
        onClick={handleResetClick}
        style={{ color: theme.palette.text.error }}
      >
        { gettext('Reset progress') }
      </Button>
    </>
  )
}
