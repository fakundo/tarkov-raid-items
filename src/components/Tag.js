import React, { memo } from 'react'
import { createUseStyles, useClassNames, useTheme, useLocales } from 'hooks'
import { CRAFT, REWARD, KAPPA } from 'constants/tags'

const useStyles = createUseStyles((theme) => ({
  root: {
    height: '1rem',
    width: '2.5rem',
    fontSize: '.8rem',
    fontWeight: 'bold',
    overflow: 'hidden',
    lineHeight: '1rem',
    textAlign: 'center',
    borderRadius: '.5rem',
    textTransform: 'uppercase',
    color: theme.palette.tag.contrastText,
  },
}))

export default memo(({ className, tag }) => {
  const { __p } = useLocales()
  const theme = useTheme()
  const classes = useStyles()

  const cx = useClassNames(() => [
    className, classes.root,
  ], [classes, className])

  return (
    <div
      data-nosnippet
      className={cx}
      style={{ background: theme.palette.tag[tag] }}
    >
      {tag === CRAFT && __p('TAG_SHORT')`Cra`}
      {tag === REWARD && __p('TAG_SHORT')`Rew`}
      {tag === KAPPA && __p('TAG_SHORT')`Kap`}
    </div>
  )
})
