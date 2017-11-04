import {
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import connectToAppProvider from 'src/state/connectToAppProvider';

export default class LoginPage extends PureComponent {
  static propTypes = {
    login: PropTypes.func,
  }

  static defaultProps = {
    login: () => (Promise.resolve()),
  }

  state = {
    didAuthenticated: false,
    errorMessage: undefined,
  }

  render() {
    // TODO: Grab redirect path from query param.
    if (this.state.didAuthenticated) return <Redirect to="/protected" />;

    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.errorMessage}
        <div>
          <label htmlFor="LoginPage-usernameInput">
            username
          </label>
          <input id="LoginPage-usernameInput" ref={c => { this.usernameInput = c; }} />
        </div>
        <div>
          <label htmlFor="LoginPage-passwordInput">
            password
          </label>
          <input id="LoginPage-passwordInput" type="password" ref={c => { this.passwordInput = c; }} />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.usernameInput.value, this.passwordInput.value)
      .then(() => {
        this.setState({ didAuthenticated: true, errorMessage: undefined });
      })
      .catch(() => {
        // TODO: Better error handling.
        this.setState({
          errorMessage: "Didn't work, try again",
        });
      });
  }
}

function mapActionsToProps(actions) {
  return {
    login: actions.login,
  };
}

export const ConnectedLoginPage = connectToAppProvider(undefined, mapActionsToProps)(LoginPage);
