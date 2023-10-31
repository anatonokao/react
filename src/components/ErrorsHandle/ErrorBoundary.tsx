import React, { Component } from 'react';
import styles from './ErrorBoundary.module.css';

interface ErrorBoundaryState {
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
  };

  fixError = () => {
    this.setState({ error: null });
  };

  componentDidCatch(error: Error) {
    console.log(error.message);
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;

    if (error)
      return (
        <div className={styles.errorContainer}>
          <div className={styles.title}>Something went wrong</div>
          <div>Error: {error.message}</div>
          <button className={styles.fixBtn} onClick={this.fixError}>
            Fix
          </button>
        </div>
      );
    return this.props.children;
  }
}

export default ErrorBoundary;
