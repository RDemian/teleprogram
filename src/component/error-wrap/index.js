import React from 'react';
import get from 'lodash/get';

import ErrorIndicator from '../error-indicator';

export class ErrorWrap extends React.Component {
  state = {
      hasError: false,
      errorInfo: '',
  };
  
  componentDidCatch(_, info) {
      this.setState({
        hasError: true,
        errorInfo: info,
      })
  }

  render() {
      const { hasError, errorInfo } = this.state;
      const stack = get(errorInfo, 'componentStack', '');
      return hasError ? <ErrorIndicator err={stack} /> : this.props.children;
  }
}