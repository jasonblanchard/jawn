import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

export default class LoginPage extends PureComponent {
  static propTypes = {
    login: PropTypes.func,
  }

  static defaultProps = {
    login: () => {},
  }

  state = {
    errorMessage: undefined,
  }

  render() {
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
        this.setState({ errorMessage: undefined });
      })
      .catch(() => {
        // TODO: Better error handling.
        this.setState({
          errorMessage: "Didn't work, try again",
        });
      });
  }
}
