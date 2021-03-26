import React, { memo, useRef, useEffect, useCallback, useLayoutEffect, cloneElement } from 'react'
import { FixedSizeList } from 'react-window'
import throttle from 'lodash/throttle'
import { createUseStyles, useTheme } from 'hooks'
import { createTransition } from 'utils'
import TransitionGroup from 'components/TransitionGroup'

const useStyles = createUseStyles((theme) => ({
  virtList: {
    outline: 0,
    height: '100% !important',
    overflow: 'visible !important',
    marginBottom: '-1rem',
  },
  innerList: {
    ...createTransition(theme, 'height', 'slow'),
    padding: 0,
    margin: 0,
  },
  row: {
    ...createTransition(theme, 'top', 'fast'),
    height: 'auto !important',
  },
}))

const ListTransitionGroupDiv = ({ innerRef, ...rest }) => (
  <ul {...rest} ref={innerRef} />
)

const ListTransitionGroup = (props) => {
  const rootRef = useRef()
  const theme = useTheme()
  const classes = useStyles()
  const { style: { height } } = props

  useLayoutEffect(() => {
    let ignore = false
    rootRef.current.style.pointerEvents = 'none'
    setTimeout(() => {
      if (!ignore) {
        rootRef.current.style.pointerEvents = ''
      }
    }, theme.animation.duration.fast)
    return () => {
      ignore = true
    }
  }, [height])

  return (
    <TransitionGroup
      {...props}
      exit
      innerRef={rootRef}
      className={classes.innerList}
      component={ListTransitionGroupDiv}
    />
  )
}

const Row = ({ index, style, data, isScrolling, ...rest }) => {
  const classes = useStyles()
  return cloneElement(data[index], {
    ...rest,
    style,
    duration: 'fast',
    className: classes.row,
  })
}

export default memo(({ children }) => {
  const classes = useStyles()
  const mainRef = useRef()
  const outerRef = useRef()

  useEffect(() => {
    const handler = throttle(() => {
      const { offsetTop = 0 } = outerRef.current || {}
      const scrollTop = window.pageYOffset - offsetTop
      mainRef.current.scrollTo(scrollTop)
    }, 10)
    window.addEventListener('scroll', handler, true)
    return () => {
      window.removeEventListener('scroll', handler, true)
    }
  }, [])

  const handleListScroll = useCallback((ev) => {
    if (ev.scrollUpdateWasRequested) {
      const { offsetTop = 0 } = outerRef.current || {}
      const nextScrollTop = ev.scrollOffset + offsetTop
      if (window.pageYOffset !== nextScrollTop) {
        window.scrollTo(0, nextScrollTop)
      }
    }
  }, [])

  return (
    <FixedSizeList
      ref={mainRef}
      outerRef={outerRef}
      className={classes.virtList}
      height={window.innerHeight}
      itemSize={106 + 16}
      itemCount={children.length}
      itemData={children}
      itemKey={(index) => children[index].key}
      onScroll={handleListScroll}
      innerElementType={ListTransitionGroup}
    >
      { Row }
    </FixedSizeList>
  )
})
