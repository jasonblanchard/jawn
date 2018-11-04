import React, { Component } from 'react';

import AuthenticatedPageLayout from 'layouts/AuthenticatedPageLayout';
import EntriesConnector from './EntriesConnector';

export default class WorkspacePage extends Component {
  // TODO: Does this belong here? Maybe, assuming it might be built up by child components...
  // TODO: Does it make sense for the variable values to be built up elsewhere?
  static query = `query ($userId: ID!, $since: String!) {
    entries(since: $since) {
      id
      text
      timeCreated
      timeUpdated
    }
    user(id: $userId) {
      username
      id
    }
  }`

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
