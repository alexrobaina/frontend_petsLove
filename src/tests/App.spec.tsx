import App from '../App'
import { AppContextProps } from '../services/AppContext'

import { render, screen } from './test-utils'

const appContext: AppContextProps = {
  session: { token: 'sessions.data.resources[0].token' },
  user: null,
}

test('App component display header', () => {
  render(<App appContext={appContext} />)

  const text = screen.getByText('Email address')

  expect(text)
})
