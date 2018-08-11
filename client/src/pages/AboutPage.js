import React, { Component } from 'react';

import AuthenticatedPageLayout from 'layouts/AuthenticatedPageLayout';

export default class AboutPage extends Component {
  render() {
    return (
      <AuthenticatedPageLayout>
        <div>AboutPage</div>
      </AuthenticatedPageLayout>
    );
  }
}
