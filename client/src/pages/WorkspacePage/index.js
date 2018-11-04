import React, { Component } from 'react';

import AuthenticatedPageLayout from 'layouts/AuthenticatedPageLayout';
import EntriesConnector from './EntriesConnector';

export default class WorkspacePage extends Component {
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
