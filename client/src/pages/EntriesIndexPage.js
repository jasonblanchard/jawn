import React, { Component } from 'react';
import moment from 'moment';

import EntryForm from 'src/components/EntryForm';
import Entry from 'src/components/Entry';
import actions from './actions';
import selectors from './selectors';

export default class EntriesIndexPage extends Component {
  render() {
    const entries = selectors.getEntries(this.state);
    return (
      <div className="EntriesIndexPage">
        <EntryForm className="EntriesIndexPage-form" isDisabled={selectors.isEntryCreating(this.state)} ref={component => { this.entryForm = component; }} onSubmit={this._handleSubmitEntryForm} />
        {entries.length === 0 ? 'No entries yet' : entries.sort((first, second) => moment(first.timeCreated).diff(second.timeCreated)).reverse().map(this._renderEntry, this)}
        <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(entries))}`} download={`jawn-entries-${moment().format()}.json`}>download</a>
      </div>
    );
  }

  componentDidMount() {
    actions.fetchEntries(this);
  }

  _renderEntry(entry) {
    return <Entry key={entry.id} entry={entry} isEntryFormDisabled={this.state.updatingEntryId === entry.id} onSubmitEntryForm={this.state.updateEntry} onClickDelete={this.state.deleteEntry} />;
  }

  _handleSubmitEntryForm = fields => {
    actions.createEntry(this, fields);
  }
}
