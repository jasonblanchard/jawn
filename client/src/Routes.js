import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import React, { Component } from 'react';

import { ConnectedLoginPage } from 'src/pages/LoginPage';
import AuthenticatedRoute from 'src/components/AuthenticatedRoute';
import { EntriesIndexPageContainer } from 'src/pages/EntriesIndexPage';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <AuthenticatedRoute exact path="/" render={() => <EntriesIndexPageContainer />} />
          <Route path="/login" render={() => <ConnectedLoginPage />} />
        </div>
      </Router>
    );
  }
}
