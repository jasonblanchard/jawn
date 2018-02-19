import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AuthenticatedPageLayout from 'src/components/AuthenticatedPageLayout';
import TokenUtils from 'src/utils/TokenUtils';

const QUERY = gql`query SettingsPageQuery($userId: ID!){
    user(id: $userId) {
      ...AuthenticatedPageLayout
    }
  }
  ${AuthenticatedPageLayout.fragments.user}
`;

class SettingsPage extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object,
  }

  render() {
    return (
      <AuthenticatedPageLayout loading={this.props.loading} user={this.props.user}>
        <section role="main">
          settings page
        </section>
      </AuthenticatedPageLayout>
    );
  }
}

export default graphql(QUERY, {
  props: ({ data }) => ({
    loading: data.loading && data.networkStatus === 'loading',
    user: data.user,
  }),
  options: () => ({
    variables: { userId: TokenUtils.decodeUserId(TokenUtils.getAccessToken()) },
    fetchPolicy: 'cache-and-network',
  }),
})(SettingsPage);
