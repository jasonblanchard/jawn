import PropTypes from 'prop-types';
import { Component } from 'react';
import http from 'superagent';

export default class AppProvider extends Component {
  static propTypes = {
    initialState: PropTypes.object,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    initialState: {},
  }

  static childContextTypes = {
    state: PropTypes.object,
    actions: PropTypes.object,
  }

  state = this.props.initialState

  getChildContext() {
    return {
      state: this.state,
      actions: {
        login: this.login,
      },
    };
  }

  render() {
    return this.props.children;
  }

  login = (username, password) => (
    http.post('/api/login')
      .send({ username, password })
  )
}
