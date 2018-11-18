import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AppProvider from 'src/state/AppProvider';
import Routes from 'src/Routes';
import TokenUtils from 'src/utils/TokenUtils';

import './App.scss';

const httpLink = createHttpLink({
  uri: '/api/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = TokenUtils.getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default class App extends Component {
  static propTypes = {
    initialState: PropTypes.object,
  }

  static defaultProps = {
    initialState: {},
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <AppProvider initialState={this.props.initialState}>
          <Routes />
        </AppProvider>
      </ApolloProvider>
    );
  }
}
