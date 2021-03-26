import React, { useCallback, useState, useEffect } from 'react'
import clamp from 'lodash/clamp'
import debounce from 'lodash/debounce'
import { createUseStyles } from 'hooks'
import TransitionGroup from 'components/TransitionGroup'
import Fade from 'components/Fade'
import Button from 'components/Button'
import { AddIcon, RemoveIcon } from 'components/Icons'

const useStyles = createUseStyles((theme) => ({
  root: {
    position: 'relative',
    margin: '-.25rem -1rem -1rem',
    padding: '.25rem calc(1rem + 24px) 1rem',
  },
  button: {
    top: 0,
    width: '50%',
    height: '100%',
    position: 'absolute',
    paddingBottom: '.75rem',
    color: theme.palette.text.muted,
    '&:not(:last-child)': {
      left: 0,
      paddingLeft: '1rem',
      justifyContent: 'flex-start',
    },
    '&:last-child': {
      right: 0,
      paddingRight: '1rem',
      justifyContent: 'flex-end',
    },
  },
  label: {
    width: '6rem',
    lineHeight: 1,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}))

export default ({ amountNeed, amountFound, onChange, ...rest }) => {
  const [amount, setAmount] = useState(amountFound)
  const classes = useStyles()

  useEffect(() => {
    setAmount(amountFound)
  }, [amountFound])

  const onChangeDebounced = useCallback((
    debounce(onChange, 50)
  ), [onChange])

  const handleChange = (ev) => {
    ev.stopPropagation()
    const change = parseInt(ev.currentTarget.getAttribute('data-change'), 10)
    const nextAmount = clamp(amount + change, 0, amountNeed)
    setAmount(nextAmount)
    onChangeDebounced(nextAmount)
  }

  return (
    <div {...rest} className={classes.root}>
      <TransitionGroup>
        <Fade key={amount}>
          <div className={classes.label}>
            <span data-nosnippet>
              {`${amount} / `}
            </span>
            {amountNeed}
          </div>
        </Fade>
      </TransitionGroup>
      <Button
        data-nosnippet
        aria-label="Decrease"
        icon={<RemoveIcon />}
        className={classes.button}
        data-change="-1"
        onClick={handleChange}
      />
      <Button
        data-nosnippet
        aria-label="Increase"
        icon={<AddIcon />}
        className={classes.button}
        data-change="1"
        onClick={handleChange}
      />
    </div>
  )
}
