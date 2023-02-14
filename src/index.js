import React from 'react'
import { render } from 'react-dom'
import App from './App'

const loader = document.querySelector('#loader')
const root = document.querySelector('#root')
loader.parentNode.removeChild(loader)
render(<App />, root)

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
  })
}
