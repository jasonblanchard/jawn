import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { CreateEntryFormContainer } from 'src/components/CreateEntryForm';
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

  state = {
    isMasked: true, // TODO: Move to action and localStorage or server
  }

  render() {
    return (
      <AuthenticatedPageLayout loading={this.props.loading} user={this.props.user}>
        <div>
          <input id="EntriesIndexPage-toggleMaskInput" type="checkbox" onChange={this.handleChangeToggleMaskInput} checked={this.state.isMasked} />
          <label htmlFor="EntriesIndexPage-toggleMaskInput">
            Toggle Mask
          </label>
        </div>
        <div className={css.container}>
          <CreateEntryFormContainer className={css.form} focusOnMount />
          {this.renderEntries(this.props.entries, this.props.loading)}
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
  options: () => ({
    variables: { userId: TokenUtils.decodeUserId(TokenUtils.getAccessToken()) },
    fetchPolicy: 'cache-and-network',
  }),
})(EntriesIndexPage);
