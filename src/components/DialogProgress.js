import React, { useCallback } from 'react'
import { useLocales, useAppState, useModal, useTheme } from 'hooks'
import DialogTitle from 'components/DialogTitle'
import Button from 'components/Button'
import Spacer from 'components/Spacer'

export default () => {
  const theme = useTheme()
  const { __, __n } = useLocales()
  const { resetProgress, progress } = useAppState()
  const { closeModal } = useModal()

  const handleResetClick = useCallback(() => {
    closeModal()
    setTimeout(resetProgress)
  }, [])

  const { found, total } = progress

  return (
    <>
      <DialogTitle>
        {__`Progress`}
      </DialogTitle>
      {__n`Found ${found} item of ${total}``Found ${found} items of ${total}`(found)}
      <b>
        {` (${((progress.found / progress.total) * 100).toFixed(2)}%)`}
      </b>
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
