import { Component } from 'react';
import PropTypes from 'prop-types';

import LinkConnector from 'components/Link/LinkConnector';
import EntriesConnector from 'pages/WorkspacePage/EntriesConnector';
import AuthenticatedPageLayoutConnector from 'layouts/AuthenticatedPageLayout/connector';

class ConnectorProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  static childContextTypes = {
    connectors: PropTypes.object,
  }

  getChildContext() {
    return {
      connectors: {
        AuthenticatedPageLayoutConnector,
        EntriesConnector,
        LinkConnector,
      },
    };
  }

  render() {
    return this.props.children;
  }
}

export default ConnectorProvider;
