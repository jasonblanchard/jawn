import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';

export default class AuthenticatedRoute extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    accessToken: PropTypes.string,
  }

  static defaultProps = {
    accessToken: undefined,
  }

  render() {
    const { render, accessToken, ...rest } = this.props;

    // TODO: Tack on original path to the redirect path in query param.
    return (
      <Route {...rest} render={accessToken ? render : () => <Redirect to="/login" />} />
    );
  }
}
