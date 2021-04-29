import React, { useEffect } from 'react'
import { useSearch } from 'hooks'
import Button from 'components/Button'
import { SearchIcon } from 'components/Icons'

export default (props) => {
  const { openSearchBox } = useSearch()

  useEffect(() => {
    const handler = (ev) => {
      if (ev.key === 'f' && (ev.metaKey || ev.ctrlKey)) {
        ev.preventDefault()
        window.scrollTo(0, 0)
        openSearchBox()
      }
    }
    document.addEventListener('keydown', handler, true)
    return () => {
      document.removeEventListener('keydown', handler, true)
    }
  }, [])

  return (
    <Button
      {...props}
      icon={<SearchIcon />}
      onClick={openSearchBox}
    />
  )
}
