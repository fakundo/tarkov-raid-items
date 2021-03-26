import React from 'react'
import { render } from 'react-dom'
import App from './App'

const loader = document.querySelector('#loader')
const root = document.querySelector('#root')
loader.parentNode.removeChild(loader)
render(<App />, root)
