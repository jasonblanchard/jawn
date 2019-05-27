import { Component } from 'react';
import PropTypes from 'prop-types';

class ConnectorProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    connectors: PropTypes.object,
  }

  static childContextTypes = {
    connectors: PropTypes.object,
  }

  getChildContext() {
    return {
      connectors: this.props.connectors,
    };
  }

  render() {
    return this.props.children;
  }
}

export default ConnectorProvider;
