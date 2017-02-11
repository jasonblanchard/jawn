import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import EntriesIndexPage from 'src/pages/EntriesIndexPage';
import LoginPage from 'src/pages/LoginPage';
import selectors from 'src/state/selectors';

class RootPage extends Component {
  static propTypes = {
    currentUser: PropTypes.shape({ id: PropTypes.string }),
  }

  static defaultProps = {
    currentUser: {},
  }

  render() {
    // TODO: Replace with a proper router
    return this.props.currentUser.id ? <EntriesIndexPage /> : <LoginPage />;
  }
}

function mapStateToProps(state) {
  return {
    currentUser: selectors.getCurrentUser(state),
  };
}

export default connect(mapStateToProps)(RootPage);
