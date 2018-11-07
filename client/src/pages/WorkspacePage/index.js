import React, { Component } from 'react';
import gql from 'graphql-tag';

import AuthenticatedPageLayout from 'layouts/AuthenticatedPageLayout';
import AuthenticatedPageLayoutConnector from 'layouts/AuthenticatedPageLayout/connector';
import EntriesConnector from './EntriesConnector';

export default class WorkspacePage extends Component {
  static query = gql`query workspacePageQuery($userId: ID!, $since: String!) {
      entries(since: $since) {
        id
        text
        timeCreated
        timeUpdated
      }
      user(id: $userId) {
        id
        ...AuthenticatedPageLayout_user
      }
    }
    ${AuthenticatedPageLayout.fragments.user}
  `;

  render() {
    return (
      <AuthenticatedPageLayoutConnector>
        {({ user }) => (
          <AuthenticatedPageLayout user={user}>
            <div>WorkspacePage</div>
            <EntriesConnector>
              {({ entries }) => {
                return entries.map(entry => <p key={entry.id}>{entry.text}</p>);
              }}
            </EntriesConnector>
          </AuthenticatedPageLayout>
        )}
      </AuthenticatedPageLayoutConnector>
    );
  }
}