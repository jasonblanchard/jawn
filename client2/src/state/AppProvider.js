import PropTypes from 'prop-types';
import { Component } from 'react';
import http from 'superagent';

import TokenUtils from 'src/utils/TokenUtils';

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
        fetchEntries: this.fetchEntries,
        updateEntry: this.updateEntry,
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

  fetchEntries = () => {
    const accessToken = TokenUtils.getAccessToken();
    return http.get('/api/entries')
      .set('Authorization', `Bearer ${accessToken}`)
      .then(response => {
        this.setState({
          entries: response.body,
        });
      });
  }

  updateEntry = (id, fields) => {
    const accessToken = TokenUtils.getAccessToken();
    return http.post(`/api/entries/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(fields)
      .then(response => {
        const entryIndex = this.state.entries.findIndex(entry => entry.id === id);
        const entries = [
          ...this.state.entries.slice(0, entryIndex),
          response.body,
          ...this.state.entries.slice(entryIndex + 1, this.state.entries.length - 1),
        ];

        this.setState({
          entries,
        });
      });
  }
}
