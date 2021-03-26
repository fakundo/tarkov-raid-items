import { useMemo, useLayoutEffect, useState } from 'react'
import { breakpoints } from 'utils'

export default ({ children, breakpoint }) => {
  const media = useMemo(() => {
    const query = breakpoints[breakpoint].replace(/^@media\s/, '')
    return window.matchMedia(query)
  }, [breakpoint])

  const [visible, setVisible] = useState(media.matches)

  useLayoutEffect(() => {
    let ignore = false
    media.onchange = ({ matches }) => {
      if (!ignore) {
        setVisible(matches)
      }
    }
    return () => {
      ignore = true
    }
  }, [media])

  return visible && children
}
