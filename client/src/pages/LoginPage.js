import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import login from 'src/actions/login';

class LoginPage extends PureComponent {
  static propTypes = {
    login: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = { errorMessage: undefined };

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
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

  _handleSubmit(event) {
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

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch(login(username, password)),
  };
}

export default connect(undefined, mapDispatchToProps)(LoginPage);
