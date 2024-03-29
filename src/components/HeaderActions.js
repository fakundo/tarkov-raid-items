import React, { useCallback } from 'react'
import { createUseStyles, useLocales, useModal, useAppState } from 'hooks'
import TransitionGroup from 'components/TransitionGroup'
import Button from 'components/Button'
import Group from 'components/Group'
import { FilterIcon, LanguageIcon } from 'components/Icons'
import ProgressIcon from 'components/ProgressIcon'
import SearchButton from 'components/SearchButton'
import DialogFilter from 'components/DialogFilter'
import DialogLocale from 'components/DialogLocale'
import DialogProgress from 'components/DialogProgress'
import Fade from 'components/Fade'

const useStyles = createUseStyles((theme) => ({
  root: {
    justifyContent: 'flex-end',
  },
  progress: {
    color: theme.palette.text.muted,
  },
  filter: {
    extend: 'progress',
  },
}))

export default () => {
  const { __, nameShort: localeName } = useLocales()
  const { openDialog } = useModal()
  const { progress, filterCount } = useAppState()
  const classes = useStyles()

  const handleProgressClick = useCallback(() => {
    openDialog(<DialogProgress />)
  }, [])

  const handleFilterClick = useCallback(() => {
    openDialog(<DialogFilter />)
  }, [])

  const handleLocaleClick = useCallback(() => {
    openDialog(<DialogLocale />)
  }, [])

  return (
    <Group className={classes.root}>
      <SearchButton>
        {__`Search`}
      </SearchButton>
      <Button
        icon={<FilterIcon />}
        onClick={handleFilterClick}
      >
        {__`Filter`}
        <TransitionGroup>
          <Fade key={filterCount}>
            <span className={classes.filter}>
              {!!filterCount && ` ${filterCount}`}
            </span>
          </Fade>
        </TransitionGroup>
      </Button>
      <Button
        icon={<ProgressIcon />}
        onClick={handleProgressClick}
      >
        {__`Progress`}
        <TransitionGroup>
          <Fade key={progress.found}>
            <span className={classes.progress}>
              {` ${((progress.found / progress.total) * 100).toFixed(2)}%`}
            </span>
          </Fade>
        </TransitionGroup>
      </Button>
      <Button
        icon={<LanguageIcon />}
        onClick={handleLocaleClick}
      >
        {localeName}
      </Button>
    </Group>
  )
}
