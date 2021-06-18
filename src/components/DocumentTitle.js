import { useEffect } from 'react'
import { useLocales } from 'hooks'

export default () => {
  const { __ } = useLocales()

  useEffect(() => {
    document.title = __`Escape from Tarkov [EFT] – Find in Raid Quest Items`
  }, [__])

  return null
}
