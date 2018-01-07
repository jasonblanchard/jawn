import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AuthenticatedPageLayout from 'src/components/AuthenticatedPageLayout';
import EditableEntry, { EditableEntryContainer } from 'src/components/EditableEntry';
import { CreateEntryFormContainer } from 'src/components/CreateEntryForm';

import css from './EntriesIndexPage.scss';

class EntriesIndexPage extends Component {
  static propTypes = {
    entries: PropTypes.array,
    loading: PropTypes.bool,
    user: PropTypes.object,
  }

  static defaultProps = {
    entries: [],
    loading: true,
  }

  render() {
    return (
      <AuthenticatedPageLayout loading={this.props.loading} user={this.props.user}>
        <div className={css.container}>
          <CreateEntryFormContainer />
          {this.renderEntries(this.props.entries, this.props.loading)}
        </div>
      </AuthenticatedPageLayout>
    );
  }

  renderEntries(entries, loading) {
    if (loading) return <div>Loading...</div>;
    return this.getEntries(entries).map(entry => (
      <EditableEntryContainer key={entry.id} entry={entry} />
    ));
  }

  getEntries(entries) {
    return [...entries].sort((entry1, entry2) => (moment(entry1.timeCreated).isBefore(entry2.timeCreated) ? 1 : -1));
  }
}

const QUERY = gql`query EntriesIndexPage($userId: ID!){
    entries {
      ...EditableEntry
    }
    user(id: $userId) {
      ...AuthenticatedPageLayout
    }
  }
  ${EditableEntry.fragments.entry}
  ${AuthenticatedPageLayout.fragments.user}
`;

export default graphql(QUERY, {
  props: ({ data }) => ({
    entries: data.entries,
    loading: data.loading && data.networkStatus === 'loading',
    user: data.user,
  }),
  options: {
    variables: { userId: '5a400afebf5614778f41f62a' }, // TODO: Parse from cookie
    fetchPolicy: 'cache-and-network',
  },
})(EntriesIndexPage);
