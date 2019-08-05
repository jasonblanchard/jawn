import gql from 'graphql-tag';
import React, { Component } from 'react';

import AuthenticatedPageLayout from 'layouts/AuthenticatedPageLayout';
import AuthenticatedPageLayoutConnector from 'layouts/AuthenticatedPageLayout/connector';

export default class SettingsPage extends Component {
  render() {
    return (
      <AuthenticatedPageLayoutConnector>
        {({ user }) => (
          <AuthenticatedPageLayout user={user}>
            <div>SettingsPage</div>
          </AuthenticatedPageLayout>
        )}
      </AuthenticatedPageLayoutConnector>
    );
  }
}
