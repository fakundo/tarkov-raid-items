import React from 'react'
import { createUseStyles } from 'hooks'
import Button from 'components/Button'
import Spacer from 'components/Spacer'

const useStyles = createUseStyles((theme) => ({
  root: {
    padding: '2rem',
    fontSize: '1.5rem',
    borderRadius: '1rem',
    display: 'inline-block',
    boxShadow: theme.shadow.card.default,
    background: theme.palette.background.card.default,
  },
  button: {
    color: theme.palette.text.error,
  },
}))

export default ({ text, buttonText, onReset }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {text}
      <Spacer />
      <Button
        className={classes.button}
        onClick={onReset}
      >
        {buttonText}
      </Button>
    </div>
  )
}
