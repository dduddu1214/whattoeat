import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('앱 에러 발생:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
          <div className="card p-8 max-w-sm text-center">
            <p className="text-4xl mb-4">😵</p>
            <h1 className="text-lg font-semibold text-stone-800 mb-2">문제가 발생했어요</h1>
            <p className="text-sm text-stone-500 mb-6">잠시 후 다시 시도해주세요.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              새로고침
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
