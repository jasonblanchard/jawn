import React, { Component } from 'react';
import gql from 'graphql-tag';

import AuthenticatedPageLayout from 'layouts/AuthenticatedPageLayout';
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
        ...AuthenticatedPageLayout_user
      }
    }
    ${AuthenticatedPageLayout.fragments.user}
  `;

  render() {
    return (
      <AuthenticatedPageLayout>
        <div>WorkspacePage</div>
        <EntriesConnector>
          {({ entries = [] }) => {
            return entries.map(entry => <p key={entry.id}>{entry.text}</p>);
          }}
        </EntriesConnector>
      </AuthenticatedPageLayout>
    );
  }
}
