import React, { Component } from 'react';

import AuthenticatedPageLayout from 'src/components/AuthenticatedPageLayout';

export default class SettingsPage extends Component {
  render() {
    return (
      <AuthenticatedPageLayout>
        <section role="main">
          settings page
        </section>
      </AuthenticatedPageLayout>
    );
  }
}
