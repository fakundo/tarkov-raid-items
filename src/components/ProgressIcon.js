import React from 'react'
import { useAppState } from 'hooks'
import { CheckCircleOutlineIcon, ErrorOutlineIcon } from 'components/Icons'

export default (props) => {
  const { isImportAvailable } = useAppState()
  return isImportAvailable
    ? <ErrorOutlineIcon {...props} />
    : <CheckCircleOutlineIcon {...props} />
}
