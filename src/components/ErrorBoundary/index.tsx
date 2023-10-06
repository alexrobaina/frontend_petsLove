import { Component, ErrorInfo, ReactNode } from 'react'
import ErrorUI from './ErrorUI'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
  error: string
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: '' }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error.message }
  }

  componentDidCatch(_: Error, errorInfo: ErrorInfo): void {
    console.error(errorInfo.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorUI msg={this.state.error} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
