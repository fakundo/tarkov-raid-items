import { CRAFT, REWARD, KAPPA } from 'constants/tags'

export default {
  palette: {
    text: {
      default: '#DADADA',
      muted: '#8897AC',
      error: '#FF6270',
      link: '#DADADA',
      selection: '#1C1C1C',
    },
    background: {
      body: '#181818',
      selection: '#DADADA',
      card: {
        default: '#1C1C1C',
        done: '#024a12',
      },
    },
    tag: {
      [CRAFT]: '#058320',
      [REWARD]: '#bd1a53',
      [KAPPA]: '#3045C5',
      contrastText: '#FFFFFF',
    },
  },
  shadow: {
    card: {
      default: '0 8px 24px rgba(0,0,0,0.4)',
      done: '0 8px 24px rgba(2,74,18,0.4)',
    },
  },
  animation: {
    duration: {
      default: 300,
      fast: 200,
      slow: 500,
    },
  },
}
