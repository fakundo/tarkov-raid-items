import React, { memo, cloneElement, useCallback } from 'react'
import noop from 'lodash/noop'
import { createUseStyles, useClassNames } from 'hooks'
import { createTransition, resetAppearance } from 'utils'

const useStyles = createUseStyles((theme) => ({
  root: {
    ...resetAppearance(),
    ...createTransition(theme, 'opacity', 'fast'),
    color: theme.palette.text.default,
    display: 'flex',
    fontSize: '1rem',
    cursor: 'pointer',
    userSelect: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      opacity: 0.6,
    },
  },
  children: {
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  icon: {
  },
  withChildren: {
    '& $icon': {
      marginRight: '.5rem',
    },
  },
}))

export default memo(({ className, icon, children, onClick = noop, ...rest }) => {
  const classes = useStyles()

  const handleClick = useCallback((ev) => {
    onClick(ev)
    document.activeElement.blur()
  }, [onClick])

  const cx = useClassNames(() => [
    className,
    classes.root,
    {
      [classes.withChildren]: !!children,
    },
  ], [classes, className, icon, children])

  return (
    <button
      tabIndex="-1"
      type="button"
      className={cx}
      onClick={handleClick}
      {...rest}
    >
      { !!icon && cloneElement(icon, { className: classes.icon })}
      { !!children && <div className={classes.children}>{children}</div>}
    </button>
  )
})
