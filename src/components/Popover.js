import React, { useLayoutEffect, useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import clamp from 'lodash/clamp'
import { createUseStyles, useModal } from 'hooks'

const useStyles = createUseStyles({
  overlay: {
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    position: 'fixed',
  },
  root: {
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'absolute',
    border: '1px solid red',
  },
})

const intitialState = {
  visibility: 'hidden',
  left: 0,
  top: 0,
}

const offset = 10

export default ({ content, anchor }) => {
  const rootRef = useRef()
  const [style, setStyle] = useState(intitialState)
  const { closeModal } = useModal()
  const classes = useStyles()

  useLayoutEffect(() => {
    if (content && anchor) {
      const root = rootRef.current
      setStyle({
        visibility: 'visible',
        top: anchor.offsetTop + anchor.clientHeight + offset,
        left: clamp(
          anchor.offsetLeft + anchor.clientWidth / 2 - root.clientWidth / 2,
          offset,
          document.body.clientWidth - root.clientWidth - offset,
        ),
      })
    }
    return () => {
      setStyle(intitialState)
    }
  }, [content])

  const handleCloseClick = useCallback(() => {
    closeModal()
  }, [])

  return !!content && createPortal(
    (
      <>
        <div // eslint-disable-line
          tabIndex="-1"
          onClick={handleCloseClick}
          className={classes.overlay}
        />
        <div
          ref={rootRef}
          style={style}
          className={classes.root}
        >
          {content}
        </div>
      </>
    ),
    document.body,
  )
}
