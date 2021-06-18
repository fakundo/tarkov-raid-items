import React, { memo, cloneElement } from 'react'
import { createUseStyles, useLocales } from 'hooks'
import { CRAFT, REWARD, KAPPA } from 'constants/tags'
import Tag from 'components/Tag'
import Group from 'components/Group'

const useStyles = createUseStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
  },
  itemIcon: {
    flexShrink: 0,
    marginRight: '.5rem',
  },
  itemText: {
    color: theme.palette.text.muted,
  },
}))

export default memo(() => {
  const { __ } = useLocales()
  const classes = useStyles()

  const items = [
    {
      tag: <Tag tag={CRAFT} />,
      text: __`Can be crafted`,
    },
    {
      tag: <Tag tag={REWARD} />,
      text: __`Can be obtained as reward`,
    },
    {
      tag: <Tag tag={KAPPA} />,
      text: __`Need for Kappa`,
    },
  ]

  return (
    <Group>
      {items.map((item) => (
        <div key={item.text} className={classes.item}>
          {cloneElement(item.tag, { className: classes.itemIcon })}
          <span className={classes.itemText}>
            {item.text}
          </span>
        </div>
      ))}
    </Group>
  )
})
