import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';

export default class AuthenticatedRoute extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    authenticatedUserId: PropTypes.string,
  }

  static defaultProps = {
    authenticatedUserId: undefined,
  }

  render() {
    const { render, authenticatedUserId, ...rest } = this.props;

    // TODO: Tack on original path to the redirect path in query param.
    return (
      <Route {...rest} render={authenticatedUserId ? render : () => <Redirect to="/login" />} />
    );
  }
}
