import PropTypes from 'prop-types';
import { Component } from 'react';
import http from 'superagent';

export default class AppProvider extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  state = {
    authenticatedUser: undefined,
  }

  render() {
    return this.props.children(this.state, { login: this.login });
  }

  login = (username, password) => (
    http.post('/api/login')
      .send({ username, password })
      .then(response => {
        const authenticatedUser = response.body;
        this.setState({
          authenticatedUser,
        });
      })
  )
}
