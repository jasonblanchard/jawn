import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { CreateEntryFormContainer } from 'src/components/CreateEntryForm';
import { getCurrentYearStartDate } from 'src/utils/TimeUtils';
import AuthenticatedPageLayout from 'src/components/AuthenticatedPageLayout';
import EditableEntry, { EditableEntryContainer } from 'src/components/EditableEntry';
import TokenUtils from 'src/utils/TokenUtils';

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

  static query = gql`query entriesIndexPageQuery($userId: ID!, $since: String!) {
      entries(since: $since) {
        ...EditableEntry_entry
      }
      user(id: $userId) {
        ...AuthenticatedPageLayout_user
      }
    }
    ${EditableEntry.fragments.entry}
    ${AuthenticatedPageLayout.fragments.user}
  `;

  state = {
    isMasked: false, // TODO: Move to action and localStorage or server
  }

  render() {
    const { user, loading, entries } = this.props;
    const { isMasked } = this.state;
    return (
      <AuthenticatedPageLayout loading={loading} user={user}>
        <div>
          <input id="EntriesIndexPage-toggleMaskInput" type="checkbox" onChange={this.handleChangeToggleMaskInput} checked={isMasked} />
          <label htmlFor="EntriesIndexPage-toggleMaskInput">
            Toggle Mask
          </label>
        </div>
        <div className={css.container}>
          <CreateEntryFormContainer className={css.form} focusOnMount />
          {this.renderEntries(entries, loading)}
          <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(entries))}`} download={`jawn-entries-${moment().format()}.json`}>download</a>
        </div>
      </AuthenticatedPageLayout>
    );
  }

  renderEntries(entries, loading) {
    if (loading) return <div>Loading...</div>;
    return this.getEntries(entries).map(entry => (
      <EditableEntryContainer key={entry.id} entry={entry} isMasked={this.state.isMasked} />
    ));
  }

  handleChangeToggleMaskInput = event => {
    this.setState({ isMasked: event.target.checked });
  }

  getEntries(entries) {
    return [...entries].sort((entry1, entry2) => (moment(entry1.timeCreated).isBefore(entry2.timeCreated) ? 1 : -1));
  }
}

export default class ConnectedEntriesIndexPage extends Component {
  render() {
    return (
      <Query query={EntriesIndexPage.query} variables={{ userId: TokenUtils.decodeUserId(TokenUtils.getAccessToken()), since: getCurrentYearStartDate() }}>
        {({ data, loading }) => (
          <EntriesIndexPage
            entries={data.entries}
            loading={loading}
            user={data.user}
          />
        )}
      </Query>
    );
  }
}