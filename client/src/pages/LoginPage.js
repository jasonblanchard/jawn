import React, { Component } from 'react';

import AuthenticatedPageLayout from 'layouts/AuthenticatedPageLayout';
import LoginForm from 'components/LoginForm';
import LoginFormConnector from 'components/LoginForm/LoginFormConnector';

export default class LoginPage extends Component {
  render() {
    return (
      <AuthenticatedPageLayout>
        <div role="main">
          <LoginFormConnector>
            {props => (
              <LoginForm {...props} />
            )}
          </LoginFormConnector>
        </div>
      </AuthenticatedPageLayout>
    );
  }
}
