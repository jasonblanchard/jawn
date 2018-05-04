import { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import http from 'superagent';
import PropTypes from 'prop-types';

import { getCurrentYearStartDate } from 'src/utils/TimeUtils';

class AppProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    createEntry: PropTypes.func,
    deleteEntry: PropTypes.func,
    initialState: PropTypes.object,
    updateEntry: PropTypes.func,
  }

  static defaultProps = {
    initialState: {},
  }

  static childContextTypes = {
    state: PropTypes.object,
    actions: PropTypes.object,
    dispatch: PropTypes.func,
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
        signUp: this.signUp,
      },
      dispatch: this.dispatch,
    };
  }

  render() {
    return this.props.children;
  }

  dispatch = action => {
    console.dir(action); // eslint-disable-line no-console

    switch (action.type) {
      case 'CREATE_ENTRY':
        this.createEntry(action.input);
        break;
      case 'UPDATE_ENTRY':
        this.updateEntry(action.id, action.input);
        break;
      case 'DELETE_ENTRY':
        this.deleteEntry(action.id);
        break;
      case 'LOGIN':
        this.login(action.username, action.password);
        break;
      case 'SIGN_UP':
        this.signUp(action.email, action.username, action.password);
        break;
      default:
    }
  }

  login = (username, password) => (
    this.updateState({
      didLoginFail: undefined,
      isLoggingIn: true,
    })
      .then(() => {
        return http.post('/api/login').send({ username, password });
      })
      .then(() => {
        return this.updateState({
          didLogIn: true,
          isLoggingIn: false,
        });
      })
      .then(() => {
        return this.updateState({
          didLogIn: undefined,
        });
      })
      .catch(() => {
        this.updateState({
          didLogIn: undefined,
          didLogInFail: true,
          isLoggingIn: undefined,
        });
      })
  )

  signUp = ({ email, username, password }) => (
    this.updateState({
      didSignUpFail: undefined,
      isSigningUp: true,
    })
      .then(() => {
        return http.post('/api/sign-up').send({ email, username, password });
      })
      .then(() => {
        return this.updateState({
          didSignUp: true,
          isSigningUp: false,
        });
      })
      .then(() => {
        return this.updateState({
          didSignUp: undefined,
        });
      })
      .catch(() => {
        this.updateState({
          didSignUp: undefined,
          didSignUpFail: true,
          isSigningUp: undefined,
        });
      })
  )

  updateState = nextState => {
    return new Promise(resolve => {
      this.setState(nextState, resolve);
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

  createEntry = input => {
    this.setState({
      didCreateEntryFail: undefined,
      isCreatingEntry: true,
    }, () => {
      this.props.createEntry(input)
        .then(() => {
          this.setState({
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

const UpdateEntryQuery = gql`
  mutation updateEntry($id: ID!, $input: EntryInput){
    updateEntry(id: $id, input: $input) {
      id
      text
      timeUpdated
    }
  }
`;

const updateEntryQueryEnhander = graphql(UpdateEntryQuery, {
  props: ({ mutate }) => ({
    updateEntry: (id, input) => mutate({ variables: { id, input } }),
  }),
});

const CreateEntryQuery = gql`
  mutation createEntry($input: EntryInput) {
    createEntry(input: $input) {
      id
      text
      timeUpdated
      timeCreated
    }
  }
`;

// TODO: This is somehow tied to EntriesIndexPage... is there a better way to update the cache?
const EntriesQuery = gql`
  query EntriesQuery($since: String!) {
    entries(since: $since) {
      id
      text
      timeUpdated
      timeCreated
    }
  }
`;

const createEntryQueryEnhancer = graphql(CreateEntryQuery, {
  props: ({ mutate }) => ({
    createEntry: input => mutate({
      variables: { input },
      update: (proxy, { data: { createEntry } }) => {
        const { entries } = proxy.readQuery({
          query: EntriesQuery,
          variables: { since: getCurrentYearStartDate() }, // Dear lord, this is ugly.
        });
        proxy.writeQuery({
          query: EntriesQuery,
          variables: { since: getCurrentYearStartDate() },
          data: {
            entries: [...entries, createEntry],
          },
        });
      },
    }),
  }),
});

const DeletEntryQuery = gql`
  mutation deleteEntry($id: ID!) {
    deleteEntry(id: $id) {
      id
    }
  }
`;

const deleteEntryQueryEnhancer = graphql(DeletEntryQuery, {
  props: ({ mutate }) => ({
    deleteEntry: (id) => mutate({
      variables: { id },
      update: (proxy, { data: { deleteEntry } }) => {
        const { entries } = proxy.readQuery({
          query: EntriesQuery,
          variables: { since: getCurrentYearStartDate() }, // Ugh.
        });
        proxy.writeQuery({
          query: EntriesQuery,
          variables: { since: getCurrentYearStartDate() },
          data: {
            entries: entries.filter(entry => entry.id !== deleteEntry.id),
          },
        });
      },
    }),
  }),
});

export default compose(
  updateEntryQueryEnhander,
  deleteEntryQueryEnhancer,
  createEntryQueryEnhancer,
)(AppProvider);
