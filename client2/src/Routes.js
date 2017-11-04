import {
  BrowserRouter as Router,
  Link,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { ConnectedLoginPage } from 'src/pages/LoginPage';
import AuthenticatedRoute from 'src/components/AuthenticatedRoute';
import connectToAppProvider from 'src/state/connectToAppProvider';
import ProtectedPage from 'src/pages/ProtectedPage';

export default class Routes extends Component {
  static propTypes = {
    authenticatedUser: PropTypes.object,
  }

  static defaultProps = {
    authenticatedUser: {
      id: undefined,
    },
  }

  render() {
    return (
      <Router>
        <div>
          <Link to="/protected">Protected route</Link>
          <Route path="/login" render={() => <ConnectedLoginPage />} />
          <AuthenticatedRoute path="/protected" authenticatedUserId={this.props.authenticatedUser.id} render={() => <ProtectedPage />} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticatedUser: state.authenticatedUser,
  };
}

export const ConnectedRoutes = connectToAppProvider(mapStateToProps)(Routes);
