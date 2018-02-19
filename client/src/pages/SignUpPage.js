import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import connectToAppProvider from 'src/state/connectToAppProvider';

import css from './SignUpPage.scss';

export default class SignUpPage extends Component {
  static propTypes = {
    didSignUp: PropTypes.bool,
    didSignUpFail: PropTypes.bool,
    signUp: PropTypes.func,
  }

  static defaultProps = {
    signUp: () => {},
  }

  render() {
    if (this.props.didSignUp) return <Redirect to="/" />;

    return (
      <div role="main">
        {this.props.didSignUpFail ? <div>did not work</div> : null}
        <form className={css.form} onSubmit={this.handleSubmit}>
          <label htmlFor="email">
            email:
            <input id="email" name="email" ref={element => { this.emailInput = element; }} />
          </label>
          <label htmlFor="username">
            username:
            <input id="username" name="username" ref={element => { this.usernameInput = element; }} />
          </label>
          <label htmlFor="password">
            password:
            <input id="password" type="password" name="password" ref={element => { this.passwordInput = element; }} />
          </label>
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const { emailInput, usernameInput, passwordInput } = this;
    this.props.signUp({ email: emailInput.value, username: usernameInput.value, password: passwordInput.value });
  }
}

function mapStateToProps(state) {
  return {
    didSignUp: state.didSignUp,
    didSignUpFail: state.didSignUpFail,
  };
}

function mapActionsToProps(actions) {
  return {
    signUp: actions.signUp,
  };
}

export const ConnectedSignUpPage = connectToAppProvider(mapStateToProps, mapActionsToProps)(SignUpPage);
