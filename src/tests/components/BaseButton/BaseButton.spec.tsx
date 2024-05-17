import { expect, vi } from 'vitest'

import { BaseButton } from '../../../components/common/BaseButton'
import { render, screen, fireappointment } from '../../test-utils'

describe('BaseButton Component', () => {
  test('renders with default props', () => {
    render(<BaseButton text="Click me" />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('renders with an icon', () => {
    render(
      <BaseButton
        text="Click me"
        icon={<span data-testid="icon">Icon</span>}
      />,
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  test('renders loader when isLoading is true', () => {
    render(<BaseButton text="Click me" isLoading />)
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  test('fires onClick appointment', () => {
    const handleClick = vi.fn()
    render(<BaseButton text="Click me" onClick={handleClick} />)
    fireappointment.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
