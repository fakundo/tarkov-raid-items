export const breakpoints = {
  xs: '@media (max-width: 599px)',
  sm: '@media (min-width: 600px) and (max-width: 959px)',
  md: '@media (min-width: 960px) and (max-width: 1279px)',
  lg: '@media (min-width: 1280px)',
  smDown: '@media (max-width: 959px)',
  mdDown: '@media (max-width: 1279px)',
  smUp: '@media (min-width: 600px)',
  mdUp: '@media (min-width: 960px)',
}

export const resetAppearance = () => ({
  fontFamily: 'inherit',
  fontWeight: 'normal',
  background: 'none',
  appearance: 'none',
  fontSize: '1rem',
  padding: 0,
  border: 0,
  margin: 0,
})

export const createTransition = (theme, transitionProperty, duration = 'default') => ({
  transitionProperty,
  transitionTimingFunction: 'ease-out',
  transitionDuration: theme.animation.duration[duration],
})

export const createPlaceholderStyles = (style) => ({
  '&::placeholder': style,
  '&:-moz-placeholder': style,
  '&::-moz-placeholder': style,
  '&:-ms-input-placeholder': style,
  '&::-webkit-input-placeholder': style,
})
