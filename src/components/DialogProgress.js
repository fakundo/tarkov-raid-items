import React from 'react'
import { useLocales, useAppState } from 'hooks'
import DialogTitle from 'components/DialogTitle'
import Spacer from 'components/Spacer'
import DialogProgressExport from 'components/DialogProgressExport'
import DialogProgressImport from 'components/DialogProgressImport'

export default () => {
  const { __, __n } = useLocales()
  const { progress, isImportAvailable } = useAppState()
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
      {isImportAvailable
        ? <DialogProgressImport />
        : <DialogProgressExport />
      }
    </>
  )
}
