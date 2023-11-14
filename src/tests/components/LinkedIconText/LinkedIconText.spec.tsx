import { expect } from 'vitest'

import { IconLocation } from '../../../assets/icons'
import { LinkedIconText } from '../../../components/common/LinkedIconText'
import { render, screen } from '../../test-utils'

describe('LinkedIconText component', () => {
  test('renders text(Mendoz) with IconLocation as icon', () => {
    render(
      <LinkedIconText
        icon={<IconLocation />}
        url="https://example.com"
        text="Mendoza"
      />,
    )

    const anchor = document.querySelector('a')
    expect(anchor).toBeInTheDocument()
    expect(anchor).toHaveAttribute('href', 'https://example.com')
    expect(anchor).toHaveAttribute('target', '_blank')
    expect(anchor).toHaveClass('underline underline-offset-[3px]')

    expect(document.querySelector('svg')).toBeInTheDocument()
    expect(document.querySelector('span > svg')).not.toBeNull()

    expect(screen.getByText('Mendoza')).toBeInTheDocument()
    expect(anchor).toHaveTextContent('Mendoza')
  })

  test("doesn't render icon when icon prop is not react element", () => {
    render(
      <LinkedIconText
        icon={<img />}
        url="https://example.com"
        text="Mendoza"
      />,
    )
    expect(document.querySelector('svg')).not.toBeInTheDocument()
  })
})
