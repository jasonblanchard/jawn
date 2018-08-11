import React, { Component } from 'react';

import AuthenticatedPageLayout from 'layouts/AuthenticatedPageLayout';

export default class WorkspacePage extends Component {
  render() {
    return (
      <AuthenticatedPageLayout>
        <div>WorkspacePage</div>
      </AuthenticatedPageLayout>
    );
  }
}
