import React, { memo, cloneElement } from 'react'
import { createUseStyles, useClassNames } from 'hooks'

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
  },
  input: {
    display: 'none',
  },
  icon: {
    marginRight: '.5rem',
  },
  label: {
    fontSize: '1rem',
    fontWeight: 'normal',
  },
})

export default memo(({ className, checked, label, iconCheck, iconUncheck, ...rest }) => {
  const classes = useStyles()

  const cx = useClassNames(() => [
    className, classes.root,
  ], [classes, className])

  return (
    <label // eslint-disable-line
      className={cx}
      {...rest}
    >
      <input
        tabIndex="-1"
        type="checkbox"
        checked={checked}
        className={classes.input}
        {...rest}
      />
      { cloneElement(checked ? iconCheck : iconUncheck, {
        className: classes.icon,
      }) }
      <span className={classes.label}>
        { label }
      </span>
    </label>
  )
})
