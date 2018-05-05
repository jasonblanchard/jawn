import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import React, { Component } from 'react';

import { ConnectedLoginPage } from 'src/pages/LoginPage';
import SettingsPage from 'src/pages/SettingsPage';
import AuthenticatedRoute from 'src/components/AuthenticatedRoute';
import EntriesIndexPage from 'src/pages/EntriesIndexPage';
import { ConnectedSignUpPage } from 'src/pages/SignUpPage';
import { WorkspacePageContainer } from 'src/pages/WorkspacePage';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <AuthenticatedRoute exact path="/" render={() => <EntriesIndexPage />} />
          <Route path="/login" render={() => <ConnectedLoginPage />} />
          <Route path="/sign-up" render={() => <ConnectedSignUpPage />} />
          <Route
            path="/workspace/:entryId?"
            render={({ match, history }) => {
              const redirect = to => history.push(to);
              return <WorkspacePageContainer selectedEntryId={match.params.entryId} redirect={redirect} />;
            }}
          />
          <AuthenticatedRoute path="/settings" render={() => <SettingsPage />} />
        </div>
      </Router>
    );
  }
}
