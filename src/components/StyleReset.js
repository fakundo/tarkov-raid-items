import { memo } from 'react'
import { createUseStyles } from 'hooks'

const useStyles = createUseStyles((theme) => ({
  '@global': {
    '*, *::before, *::after': {
      outline: 0,
      boxSizing: 'border-box',
      tapHighlightColor: 'rgba(0,0,0,0)',
    },
    '*::selection': {
      color: theme.palette.text.selection,
      background: theme.palette.background.selection,
    },
    html: {
      fontSize: 16,
      fontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    body: {
      margin: 0,
      fontSize: '1rem',
      fontStyle: 'normal',
      fontWeight: 'normal',
      textSizeAdjust: '100%',
      color: theme.palette.text.default,
      backgroundColor: theme.palette.background.body,
    },
    'html, body, #root': {
      height: '100%',
    },
  },
}))

export default memo(() => {
  useStyles()
  return null
})
