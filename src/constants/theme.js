import { CRAFT, REWARD, KAPPA } from 'constants/tags'

export default {
  palette: {
    text: {
      default: '#DADADA',
      muted: '#8897AC',
      error: '#FF6270',
      link: '#DADADA',
    },
    background: {
      body: '#181818',
      card: '#1C1C1C',
    },
    tag: {
      [CRAFT]: '#058320',
      [REWARD]: '#bd1a53',
      [KAPPA]: '#3045C5',
      contrastText: '#FFFFFF',
    },
  },
  shadow: {
    card: '0 8px 24px rgba(0,0,0,0.4)',
  },
  animation: {
    duration: {
      default: 300,
      fast: 200,
      slow: 500,
    },
  },
}
