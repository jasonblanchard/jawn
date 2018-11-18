import { Component } from 'react';
import PropTypes from 'prop-types';

import AuthenticatedPageLayoutConnector from 'layouts/AuthenticatedPageLayout/connector';
import EntryDeleteContainerConnector from 'components/EntryDeleteContainer/EntryDeleteContainerConnector';
import EntriesConnector from 'pages/WorkspacePage/EntriesConnector';
import EntryEditorConnector from 'components/EntryEditor/EntryEditorConnector';
import EntryFormConnector from 'components/EntryForm/EntryFormConnector';
import LinkConnector from 'components/Link/LinkConnector';

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
        EntryDeleteContainerConnector,
        EntriesConnector,
        EntryEditorConnector,
        EntryFormConnector,
        LinkConnector,
      },
    };
  }

  render() {
    return this.props.children;
  }
}

export default ConnectorProvider;
