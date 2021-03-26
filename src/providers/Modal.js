import React, { createContext, useMemo, useEffect, useState } from 'react'
import uniqueId from 'lodash/uniqueId'
import Dialog from 'components/Dialog'
// import Popover from 'components/Popover'

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
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
    closeModal: () => {
      setState({
        dialog: null,
        popover: null,
      })
    },
  }), [])

  useEffect(() => {
    if (!visible) {
      return () => {}
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
      { children }
      <Dialog {...state.dialog} />
      {/* <Popover {...state.popover} /> */}
    </ModalContext.Provider>
  )
}
