import React, { createContext, useMemo, useEffect, useState } from 'react'
import uniqueId from 'lodash/uniqueId'
import { useTheme } from 'hooks'
import Dialog from 'components/Dialog'
// import Popover from 'components/Popover'

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const theme = useTheme()
  const [state, setState] = useState({})

  const visible = !!state.dialog?.content
    || !!state.popover?.content

  const value = useMemo(() => ({
    openDialog: (content) => {
      setState({
        dialog: { content, contentKey: uniqueId() },
        popover: null,
      })
    },
    openPopover: (content, anchor) => {
      setState({
        dialog: null,
        popover: { content, anchor },
      })
    },
    closeModal: (callback) => {
      setState({
        dialog: null,
        popover: null,
      })
      if (callback) {
        setTimeout(callback, theme.animation.duration.fast)
      }
    },
  }), [])

  useEffect(() => {
    if (!visible) {
      return () => { }
    }
    const handler = (ev) => {
      if (ev.key === 'Escape') {
        ev.preventDefault()
        ev.stopPropagation()
        value.closeModal()
      }
    }
    document.addEventListener('keydown', handler, true)
    return () => {
      document.removeEventListener('keydown', handler, true)
    }
  }, [visible])

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Dialog {...state.dialog} />
      {/* <Popover {...state.popover} /> */}
    </ModalContext.Provider>
  )
}
