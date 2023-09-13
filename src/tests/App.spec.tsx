import { render, screen } from './test-utils'
import App from '../App'

const appContext = {
  session: { token: 'sessions.data.resources[0].token' },
  user: 'sessions.data.resources[0].user',
}

test('App component display header', () => {
  render(<App appContext={appContext} />)

  const text = screen.getByText('Vite + React + pets love')

  expect(text)
})
