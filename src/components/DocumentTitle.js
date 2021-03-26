import { useEffect } from 'react'
import { useLocales } from 'hooks'

export default () => {
  const { gettext } = useLocales()

  useEffect(() => {
    document.title = gettext('Escape from Tarkov – [EFT] Find in Raid Items')
  }, [gettext])

  return null
}
