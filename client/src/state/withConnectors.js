import React, { Component } from 'react';

// TODO: Refactor to use proper HoC patterns.
export default function withConnectors(connectorMap = {}) {
  return WrappedComponent => {
    class Connect extends Component {
      render() {
        return <WrappedComponent {...this.props} connectors={connectorMap} />;
      }
    }

    return Connect;
  };
}
