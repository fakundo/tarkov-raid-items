import { memo } from 'react'
import { createUseStyles } from 'hooks'
import benderRegular from 'assets/font/bender.regular.otf'
import benderBold from 'assets/font/bender.bold.otf'

export const fonts = [
  {
    fontFamily: 'Bender',
    fontWeight: 'normal',
    src: `url(${benderRegular}) format('opentype')`,
  },
  {
    fontFamily: 'Bender',
    fontWeight: 'bold',
    src: `url(${benderBold}) format('opentype')`,
  },
]

const useStyles = createUseStyles({
  '@font-face': fonts.map((font) => ({
    ...font,
    fontStyle: 'normal',
    fontDisplay: 'swap',
  })),
  '@global body': {
    fontFamily: 'Bender, Arial',
  },
})

export default memo(() => {
  useStyles()
  return null
})
