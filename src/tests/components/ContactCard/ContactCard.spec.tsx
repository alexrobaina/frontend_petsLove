import { expect } from 'vitest'

import { ContactCard } from '../../../components/common/ContactCard'
import { render, screen } from '../../test-utils'

describe('Card Component', () => {
  test('initial render with all data', () => {
    render(
      <ContactCard
        name="Jane Cooper"
        description="Regional Paradigm Technician"
        status="Regular User"
        image="https://example.com"
        altText="Jane Cooper's profile picture"
      />,
    )

    expect(screen.getByText('Jane Cooper', { exact: true })).toBeInTheDocument()
    expect(
      screen.getByText('Regional Paradigm Technician', { exact: true }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Regular User', { exact: true }),
    ).toBeInTheDocument()

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', 'https://example.com')
    expect(image).toHaveAttribute('alt', "Jane Cooper's profile picture")
  })

  test('render status as Admin', () => {
    render(
      <ContactCard
        name="Jane"
        description="Regional Paradigm Technician"
        status="Admin"
        image="https://example.com"
      />,
    )

    expect(screen.getByText('Admin', { exact: true }))
    expect(screen.getByText('Jane', { exact: true }))
    expect(screen.getByText('Regional Paradigm Technician', { exact: true }))
  })

  test('render default alt text when not provided', () => {
    render(
      <ContactCard
        name="Jane"
        description="Regional Paradigm Technician"
        status="Regular User"
        image="https://example.com"
      />,
    )

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', 'https://example.com')
    expect(image).toHaveAttribute('alt', "Jane's Profile Picture")

    expect(document.querySelector('svg')).not.toBeInTheDocument()
  })

  test('renders IconUser if image not provided', () => {
    render(
      <ContactCard
        name="Jane"
        description="Regional Paradigm Technician"
        status="Regular User"
      />,
    )

    expect(document.querySelector('img')).not.toBeInTheDocument()
    expect(document.querySelector('svg')).toBeInTheDocument()

    expect(document.querySelector('h3')).toHaveTextContent('Jane')
    expect(document.querySelector('span')).toHaveTextContent('Regular User')
    expect(document.querySelector('p')).toHaveTextContent(
      'Regional Paradigm Technician',
    )
  })

  test('renders IconUser if image is empty string', () => {
    render(
      <ContactCard
        name="Jane"
        description="Regional Paradigm Technician"
        status="Regular User"
        image=""
      />,
    )

    expect(document.querySelector('img')).not.toBeInTheDocument()
    expect(document.querySelector('svg')).toBeInTheDocument()

    expect(document.querySelector('h3')).toHaveTextContent('Jane')
    expect(document.querySelector('span')).toHaveTextContent('Regular User')
    expect(document.querySelector('p')).toHaveTextContent(
      'Regional Paradigm Technician',
    )
  })
})
