'use client';

import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center">
          <ExclamationTriangleIcon className="h-16 w-16 text-red-500" />
          <h2 className="mt-4 text-2xl font-bold">Something went wrong</h2>
          <p className="mt-2 text-gray-600">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}