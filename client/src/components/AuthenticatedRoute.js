import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import TokenUtils from 'src/utils/TokenUtils';

export default class AuthenticatedRoute extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
  }

  render() {
    const { render, ...rest } = this.props;
    const accessToken = TokenUtils.getAccessToken();

    // TODO: Tack on original path to the redirect path in query param.
    return (
      <Route {...rest} render={accessToken ? render : () => <Redirect to="/login" />} />
    );
  }
}
