import {
  Redirect,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import connectToAppProvider from 'src/state/connectToAppProvider';

export default class LoginPage extends PureComponent {
  static propTypes = {
    didLogIn: PropTypes.bool,
    didLoginFail: PropTypes.bool,
    isLoggingIn: PropTypes.bool,
    login: PropTypes.func,
  }

  state = {
    errorMessage: undefined,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didLoginFail) {
      this.setState({ errorMessage: "Didn't work, try again" });
    }
  }

  render() {
    // TODO: Grab redirect path from query param.
    if (this.props.didLogIn) return <Redirect to="/" />;

    return (
      <div role="main">
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
          <button type="submit" disabled={this.props.isLoggingIn}>Login</button>
        </form>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.usernameInput.value, this.passwordInput.value);
  }
}

function mapStateToProps(state) {
  return {
    didLogIn: state.didLogIn,
    didLoginFail: state.didLogInFail,
    isLoggingIn: state.isLoggingIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch({ type: 'LOGIN', username, password }),
  };
}

export const ConnectedLoginPage = connectToAppProvider(mapStateToProps, mapDispatchToProps)(LoginPage);
