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
    card: 'rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px',
  },
  animation: {
    duration: {
      default: 300,
      fast: 200,
      slow: 500,
    },
  },
}
