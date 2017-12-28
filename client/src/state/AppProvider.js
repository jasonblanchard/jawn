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
        createEntry: this.createEntry,
        deleteEntry: this.deleteEntry,
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
    // return http.get('/api/entries')
    //   .set('Authorization', `Bearer ${accessToken}`)
    //   .then(response => {
    //     this.setState({
    //       entries: response.body,
    //     });
    //   });

    const query = `{
      entries {
        id
        text
        timeCreated
        timeUpdated
      }
    }`;

    return http.get('/api/graphql')
      .query({ query })
      .set('Authorization', `Bearer ${accessToken}`)
      .then(response => {
        this.setState({
          entries: response.body.data.entries,
        });
      });
  }

  updateEntry = (id, fields) => {
    this.setState({
      updatingEntryFailedId: undefined,
      isUpdatingEntryId: id,
    }, () => {
      const accessToken = TokenUtils.getAccessToken();

      const query = `mutation updateEntry($id: ID!, $input: EntryInput) {
        updateEntry(id: $id, input: $input) {
          id
          text
        }
      }`;

      const variables = {
        id,
        input: fields,
      };

      return http.post('/api/graphql')
        .set('Authorization', `Bearer ${accessToken}`)
        // .send(fields)
        .send({ query, variables })
        .then(response => {
          const entryIndex = this.state.entries.findIndex(entry => entry.id === id);
          const entries = [
            ...this.state.entries.slice(0, entryIndex),
            response.body.data.updateEntry,
            ...this.state.entries.slice(entryIndex + 1, this.state.entries.length - 1),
          ];

          this.setState({
            entries,
            isUpdatingEntryId: undefined,
          }, () => {
            this.setState({
              didUpdateEntryId: id,
            }, () => {
              this.setState({
                didUpdateEntryId: undefined,
              });
            });
          });
        })
        .catch(() => {
          this.setState({
            updatingEntryFailedId: id,
            isUpdatingEntryId: undefined,
          });
        });
    });
  }

  createEntry = fields => {
    this.setState({
      didCreateEntryFail: undefined,
      isCreatingEntry: true,
    }, () => {
      const accessToken = TokenUtils.getAccessToken();
      return http.post('/api/entries')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(fields)
        .then(response => {
          const entries = [
            ...this.state.entries,
            response.body,
          ];

          this.setState({
            entries,
            isCreatingEntry: undefined,
            didCreateEntry: true,
          }, () => {
            this.setState({
              didCreateEntry: undefined,
            });
          });
        })
        .catch(() => {
          this.setState({
            didCreateEntryFail: true,
            isCreatingEntry: false,
          });
        });
    });
  }

  deleteEntry = entryId => {
    this.setState({
      isDeletingEntryId: entryId,
    }, () => {
      const accessToken = TokenUtils.getAccessToken();
      http.delete(`/api/entries/${entryId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .then(() => {
          const entries = this.state.entries.filter(entry => entry.id !== entryId);
          this.setState({
            entries,
            isDeletingEntryId: undefined,
          });
        })
        .catch(() => {
          this.setState({
            isDeletingEntryId: undefined,
          });
        });
    });
  }
}
