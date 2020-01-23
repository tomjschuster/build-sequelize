import * as React from 'react'
import { render } from 'react-dom'
import App from './view/App'
import GlobalStyles from './view/GlobalStyles'

const root = document.createElement('div')

document.body.appendChild(root)

render(
  <>
    <GlobalStyles />
    <App />
  </>,
  root,
)
