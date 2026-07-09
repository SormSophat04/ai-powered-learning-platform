import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
            <span className="text-red-500 text-xl font-bold">!</span>
          </div>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Something went wrong
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[320px] text-center leading-relaxed">
            An unexpected error occurred. Please refresh the page or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="py-2 px-4 bg-[#7C3AED] hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
