import { connect } from 'react-redux';
import React, { PureComponent, PropTypes } from 'react';
import { Link } from 'found';
import { Actions as FarceActions } from 'farce';

import login from 'src/actions/login';

class LoginPage extends PureComponent {
  static propTypes = {
    login: PropTypes.func,
    push: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <Link to="/">test</Link>
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
        this.props.push('/');
      })
      .catch(() => {
        // TODO: Something
      });
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch(login(username, password)),
    push: (path) => dispatch(FarceActions.push(path)),
  };
}

export default connect(undefined, mapDispatchToProps)(LoginPage);
