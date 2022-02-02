import React, { useCallback, useRef } from 'react'
import { createUseStyles, useAppState } from 'hooks'

const useStyles = createUseStyles((theme) => ({
  root: {
    padding: '.5rem',
    borderRadius: '.5rem',
    background: theme.palette.background.body,

    '& textarea': {
      border: 0,
      width: '100%',
      resize: 'none',
      background: 'none',
      wordBreak: 'break-all',
      fontFamily: 'monospace',
      height: '2rem',
      fontSize: '.8rem',
      lineHeight: '.9rem',
      color: theme.palette.text.default,
    },
  },
}))

export default () => {
  const classes = useStyles()
  const inputRef = useRef()
  const { createExportLink } = useAppState()

  const handleFocus = useCallback(() => {
    inputRef.current?.select()
  }, [])

  return (
    <div className={classes.root}>
      <textarea
        readOnly
        ref={inputRef}
        onFocus={handleFocus}
        value={createExportLink()}
      />
    </div>
  )
}
