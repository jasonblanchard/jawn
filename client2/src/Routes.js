import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import React, { Component } from 'react';

import { ConnectedLoginPage } from 'src/pages/LoginPage';
import AuthenticatedRoute from 'src/components/AuthenticatedRoute';
import ProtectedPage from 'src/pages/ProtectedPage';
import TokenUtils from 'src/utils/TokenUtils';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <AuthenticatedRoute exact path="/" accessToken={TokenUtils.getAccessToken()} render={() => <ProtectedPage />} />
          <Route path="/login" render={() => <ConnectedLoginPage />} />
        </div>
      </Router>
    );
  }
}
