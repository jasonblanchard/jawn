import PropTypes from 'prop-types';
import React, { Component } from 'react';

const withConnectors = connectors => Consumer => (
  class WrappedConnectorConsumer extends Component {
    static contextTypes = {
      connectors: PropTypes.object,
    }

    render() {
      const { connectors: globalConnectors = {} } = this.context;
      return <Consumer {...this.props} connectors={{ ...connectors, ...globalConnectors }} />;
    }
  }
);

export default withConnectors;
