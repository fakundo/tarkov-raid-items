import React from 'react'
import map from 'lodash/map'
import { createUseStyles } from 'hooks'
import Link from 'components/Link'
import Group from 'components/Group'

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  image: {
    flexShrink: 0,
    marginRight: '.5rem',
  },
  link: {
    overflow: 'hidden',
    overflowWrap: 'break-word',
  },
  hint: {
    flexShrink: 0,
    fontWeight: 'bold',
    marginLeft: '.5rem',
  },
})

export default ({ links }) => {
  const classes = useStyles()
  return (
    <Group vertical>
      { map(links, (link, index) => (
        <div
          key={index}
          className={classes.root}
        >
          <img
            alt={link.imageAlt}
            src={link.image}
            className={classes.image}
            height="32"
            width="32"
          />
          <Link
            target="_blank"
            href={link.href}
            className={classes.link}
          >
            { link.text }
          </Link>
          { map(link.hints, (hint, hintIndex) => !!hint && (
            <div
              key={hintIndex}
              className={classes.hint}
            >
              { hint}
            </div>
          )) }
        </div>
      )) }
    </Group>
  )
}
