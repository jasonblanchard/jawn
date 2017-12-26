import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AuthenticatedPageLayout from 'src/components/AuthenticatedPageLayout';
import connectToAppProvider from 'src/state/connectToAppProvider';
import { EditableEntryContainer } from 'src/components/EditableEntry';
import { CreateEntryFormContainer } from 'src/components/CreateEntryForm';

import css from './EntriesIndexPage.scss';

export default class EntriesIndexPage extends Component {
  static propTypes = {
    fetchEntries: PropTypes.func.isRequired,
    entries: PropTypes.array,
  }

  static defaultProps = {
    entries: undefined,
  }

  componentDidMount() {
    this.props.fetchEntries();
  }

  render() {
    if (!this.props.entries) return <div>Loading...</div>;
    return (
      <AuthenticatedPageLayout>
        <section className={css.container} role="main">
          <CreateEntryFormContainer />
          {this.getEntries().map(entry => (
            <EditableEntryContainer key={entry.id} entry={entry} />
          ))}
        </section>
      </AuthenticatedPageLayout>
    );
  }

  getEntries() {
    return this.props.entries.sort((entry1, entry2) => (moment(entry1.timeCreated).isBefore(entry2.timeCreated) ? 1 : -1));
  }
}

function mapStateToProps(state) {
  return {
    entries: state.entries,
  };
}

function mapActionsToProps(actions) {
  return {
    fetchEntries: actions.fetchEntries,
  };
}

export const EntriesIndexPageContainer = connectToAppProvider(mapStateToProps, mapActionsToProps)(EntriesIndexPage);
