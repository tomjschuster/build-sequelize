import { render, screen } from '@testing-library/react'
import * as React from 'react'

import App from '../App'

describe('<App />', () => {
  test('should display "Hello World"', async () => {
    render(<App />)
    const title = screen.getByText('Hello World')
    expect(title).toBeTruthy()
  })
})
