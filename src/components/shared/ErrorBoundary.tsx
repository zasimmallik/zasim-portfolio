/**
 * Error Boundary Component
 * Catches React errors and prevents app crash
 */

import React, { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(errorCaught: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error: errorCaught,
      errorInfo,
    });

    // Log error in development
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', errorCaught, errorInfo);
    }

    // TODO: Send error to error tracking service in production
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800">
          <div className="max-w-md w-full p-8 bg-slate-800 rounded-lg shadow-xl border border-red-500/20">
            <div className="text-center">
              <div className="text-6xl mb-4">
                ??????
              </div>
              <h1 className="text-2xl font-bold text-red-400 mb-2">Something went wrong</h1>
              <p className="text-gray-300 mb-6">
                We encountered an unexpected error. Please try refreshing the page.
              </p>

              {import.meta.env.DEV && this.state.error && (
                <details className="mt-4 p-4 bg-slate-900 rounded text-left text-sm text-gray-400 border border-red-500/20">
                  <summary className="cursor-pointer text-red-400 mb-2">Error Details</summary>
                  <p className="font-mono text-xs whitespace-pre-wrap">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <p className="font-mono text-xs whitespace-pre-wrap mt-2">
                      {this.state.errorInfo.componentStack}
                    </p>
                  )}
                </details>
              )}

              <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

