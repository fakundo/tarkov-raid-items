import React, { useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { createUseStyles, useModal } from 'hooks'
import TransitionGroup from 'components/TransitionGroup'
import { CloseIcon } from 'components/Icons'
import Container from 'components/Container'
import Button from 'components/Button'
import Fade from 'components/Fade'

const useStyles = createUseStyles((theme) => ({
  overlay: {
    top: 0,
    left: 0,
    opacity: 0.9,
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    background: theme.palette.background.body,
  },
  root: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    position: 'fixed',
  },
  inner: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: 500,
    flexShrink: 0,
    padding: '2rem',
    maxWidth: '100%',
    overflow: 'hidden',
    borderRadius: '1rem',
    position: 'relative',
    overflowWrap: 'break-word',
    boxShadow: theme.shadow.card,
    background: theme.palette.background.card,
  },
  contentClose: {
    top: '.5rem',
    right: '.5rem',
    position: 'absolute',
  },
}))

export default ({ content, contentKey }) => {
  const scrollYRef = useRef(0)
  const { closeModal } = useModal()
  const classes = useStyles()

  const handleAppear = useCallback(() => {
    scrollYRef.current = window.pageYOffset
    document.body.style.width = `${document.body.clientWidth}px`
    document.body.style.overflow = 'hidden'
  }, [])

  const handleExited = useCallback(() => {
    document.body.style.width = ''
    document.body.style.overflow = ''
    window.scrollTo(0, scrollYRef.current)
  }, [])

  const handleContentClick = useCallback((ev) => {
    ev.stopPropagation()
  }, [])

  return createPortal((
    <TransitionGroup appear exit>
      { !!content && (
        <Fade
          onEnter={handleAppear}
          onExited={handleExited}
        >
          <div>
            <div className={classes.overlay} />
            <Container
              tabIndex="-1"
              onClick={closeModal}
              className={classes.root}
            >
              <div className={classes.inner}>
                <TransitionGroup>
                  <Fade key={contentKey}>
                    <div // eslint-disable-line
                      tabIndex="-1"
                      className={classes.content}
                      onClick={handleContentClick}
                    >
                      { content }
                      <Button
                        aria-label="Close"
                        icon={<CloseIcon />}
                        onClick={closeModal}
                        className={classes.contentClose}
                      />
                    </div>
                  </Fade>
                </TransitionGroup>
              </div>
            </Container>
          </div>
        </Fade>
      ) }
    </TransitionGroup>
  ), document.body)
}
