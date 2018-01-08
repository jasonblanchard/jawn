import { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import http from 'superagent';
import PropTypes from 'prop-types';

import TokenUtils from 'src/utils/TokenUtils';

const QUERY_PATH = '/api/graphql';

class AppProvider extends Component {
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
    const query = `{
      entries {
        id
        text
        timeCreated
        timeUpdated
      }
    }`;

    return http.get(QUERY_PATH)
      .query({ query })
      .set('Authorization', `Bearer ${accessToken}`)
      .then(response => {
        this.setState({
          entries: response.body.data.entries,
        });
      });
  }

  updateEntry = (id, input) => {
    this.setState({
      updatingEntryFailedId: undefined,
      isUpdatingEntryId: id,
    }, () => {
      return this.props.updateEntry(id, input)
        .then(() => {
          this.setState({
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

      const query = `mutation createEntry($input: EntryInput) {
        createEntry(input: $input) {
          text
        }
      }`;

      const variables = {
        input: fields,
      };

      return http.post(QUERY_PATH)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ query, variables })
        .then(response => {
          const entries = [
            ...this.state.entries,
            response.body.data.createEntry,
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
      return this.props.deleteEntry(entryId)
        .then(() => {
          this.setState({
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

const updateEntryQuery = gql`
  mutation updateEntry($id: ID!, $input: EntryInput){
    updateEntry(id: $id, input: $input) {
      id
      text
      timeUpdated
    }
  }
`;

const updateEntryQueryEnhander = graphql(updateEntryQuery, {
  props: ({ mutate }) => ({
    updateEntry: (id, input) => mutate({ variables: { id, input } }),
  }),
});

const deletEntryQuery = gql`
  mutation deleteEntry($id: ID!) {
    deleteEntry(id: $id) {
      id
      isDeleted
    }
  }
`;

const deleteEntryQueryEnhancer = graphql(deletEntryQuery, {
  props: ({ mutate }) => ({
    deleteEntry: (id) => mutate({ variables: { id } }),
  }),
});

export default compose(
  updateEntryQueryEnhander,
  deleteEntryQueryEnhancer,
)(AppProvider);
