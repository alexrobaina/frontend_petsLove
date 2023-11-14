import ErrorBoundary from '../../../../src/components/common/ErrorBoundary/index'
import { expect } from 'vitest'

import { render } from '../../test-utils'

describe('ErrorBoundary component', () => {
  test('should catch text props is empty error', () => {
    const TestComponent = (props: { text: string }) => {
      if (!props.text) {
        throw new Error('text props is empty')
      }

      return <h1>{props.text}</h1>
    }

    render(
      <ErrorBoundary>
        {/* @ts-ignore*/}
        <TestComponent />
      </ErrorBoundary>,
    )

    const heading = document.querySelector('h1')
    expect(heading).toHaveTextContent('Oops!')

    const span1 = document.querySelector('span')
    expect(span1).toHaveTextContent(
      "Something busted that we didn't anticipate.",
    )

    const span2 = document.querySelector('span:last-child')
    expect(span2).toHaveTextContent('Error: text props is empty')
  })

  test('should display children props', () => {
    const TestComponent = (props: { text: string }) => {
      if (!props.text) {
        throw new Error('text props is empty')
      }

      return <h1>{props.text}</h1>
    }

    render(
      <ErrorBoundary>
        <TestComponent text={'I am being displayed!'} />
      </ErrorBoundary>,
    )

    const heading = document.querySelector('h1')
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('I am being displayed!')

    expect(document.querySelectorAll('h1')).to.have.lengthOf(1)
    expect(document.querySelector('span')).not.toBeInTheDocument()
  })
})
