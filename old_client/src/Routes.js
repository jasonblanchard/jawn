import {
  BrowserRouter as Router,
  Route,
  Redirect,
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
          <Route exact path="/" render={() => <Redirect to="/workspace" />} />
          <AuthenticatedRoute exact path="/legacy" render={() => <EntriesIndexPage />} />
          <AuthenticatedRoute
            path="/workspace/:entryId?"
            render={({ match, history }) => {
              const redirect = to => history.push(to);
              return <WorkspacePageContainer selectedEntryId={match.params.entryId} redirect={redirect} />;
            }}
          />
          <Route path="/login" render={() => <ConnectedLoginPage />} />
          <Route path="/sign-up" render={() => <ConnectedSignUpPage />} />
          <AuthenticatedRoute path="/settings" render={() => <SettingsPage />} />
        </div>
      </Router>
    );
  }
}
