import { Component, ErrorInfo, ReactNode } from 'react';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  errorMessage: string | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, errorMessage: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.errorMessage}</p>
          <button onClick={this.resetError}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
