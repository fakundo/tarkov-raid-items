import React, { memo, useCallback } from 'react'
import { createUseStyles, useClassNames, useLocales, useModal } from 'hooks'
import { createTransition } from 'utils'
import { CRAFT, REWARD, KAPPA } from 'constants/tags'
import Tag from 'components/Tag'
import ItemCounter from 'components/ItemCounter'
import DialogItem from 'components/DialogItem'

const useStyles = createUseStyles((theme) => ({
  root: {
    ...createTransition(theme, 'background'),
    display: 'grid',
    gridTemplate: '1rem auto / 64px auto',
    gridGap: '.5rem',
    justifyItems: 'end',
    alignItems: 'center',
    margin: 0,
    padding: '1rem',
    cursor: 'pointer',
    listStyle: 'none',
    userSelect: 'none',
    borderRadius: '1rem',
    boxShadow: theme.shadow.card,
    background: theme.palette.background.card.default,
  },
  image: {
    gridArea: '1 / 1 / 4 / 1',
    display: 'block',
    cursor: 'pointer',
  },
  name: {
    width: '100%',
    cursor: 'pointer',
    overflow: 'hidden',
    textAlign: 'right',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.muted,
  },
  tags: {
    display: 'flex',
    cursor: 'pointer',
    '& > *': { marginLeft: '.5rem' },
  },
  done: {
    background: theme.palette.background.card.done,
  },
}))

export default memo(({
  className, style,
  item, amountNeed, amountFound,
  done, craft, reward, kappa, updateCounter,
}) => {
  const classes = useStyles()
  const { openDialog } = useModal()
  const { locale } = useLocales()

  const handleCounterChange = useCallback((amount) => {
    updateCounter(item.key, amount)
  }, [updateCounter, item.key])

  const handleItemClick = useCallback(() => {
    openDialog(<DialogItem item={item} />)
  }, [openDialog, item])

  const cx = useClassNames(() => [
    className,
    classes.root,
    {
      [classes.done]: done,
    },
  ], [className, classes, done])

  return (
    <li // eslint-disable-line
      itemScope
      tabIndex="-1"
      style={style}
      className={cx}
      onClick={handleItemClick}
    >
      <img
        itemProp="image"
        src={item.image}
        alt={item.getName(locale)}
        className={classes.image}
        height="64"
        width="64"
      />
      <div
        itemProp="tags"
        className={classes.tags}
      >
        {craft && <Tag tag={CRAFT} />}
        {reward && <Tag tag={REWARD} />}
        {kappa && <Tag tag={KAPPA} />}
      </div>
      <div
        data-nosnippet
        itemProp="name"
        className={classes.name}
      >
        {item.getNameShort(locale)}
      </div>
      <ItemCounter
        itemProp="count"
        onChange={handleCounterChange}
        {...{ amountNeed, amountFound }}
      />
    </li>
  )
})
