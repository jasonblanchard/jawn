import { connect } from 'react-redux';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';

import createEntry from 'src/actions/createEntry';
import deleteEntry from 'src/actions/deleteEntry';
import Entry from 'src/components/Entry';
import EntryForm from 'src/components/EntryForm';
import fetchEntries from 'src/actions/fetchEntries';
import selectors from 'src/state/selectors';
import updateEntry from 'src/actions/updateEntry';

import './EntriesIndexPage.css';

class EntriesIndexPage extends Component {
  static propTypes = {
    createEntry: PropTypes.func,
    deleteEntry: PropTypes.func,
    entries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
    })),
    fetchEntries: PropTypes.func,
    isEntryCreating: PropTypes.bool,
    updateEntry: PropTypes.func,
    updatingEntryId: PropTypes.string,
  }

  static defaultProps = {
    entries: [],
  }

  constructor(props) {
    super(props);

    this._handleSubmitEntryForm = this._handleSubmitEntryForm.bind(this);
  }

  render() {
    return (
      <div className="EntriesIndexPage">
        <EntryForm className="EntriesIndexPage-form" isDisabled={this.props.isEntryCreating} ref={component => { this.entryForm = component; }} onSubmit={this._handleSubmitEntryForm} />
        {this.props.entries.length === 0 ? 'No entries yet' : this.props.entries.sort((first, second) => moment(first.timeCreated).diff(second.timeCreated)).reverse().map(this._renderEntry, this)}
        <a href={`data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(this.props.entries))}`} download={`jawn-entries-${moment().format()}.json`}>download</a>
      </div>
    );
  }

  _renderEntry(entry) {
    return <Entry key={entry.id} entry={entry} isEntryFormDisabled={this.props.updatingEntryId === entry.id} onSubmitEntryForm={this.props.updateEntry} onClickDelete={this.props.deleteEntry} />;
  }

  componentDidMount() {
    // TODO: Move to a routes file when we have a proper router.
    this.props.fetchEntries();
  }

  _handleSubmitEntryForm(fields) {
    this.props.createEntry(fields)
      .then(() => {
        this.entryForm.reset();
        this.entryForm.blur();
      });
  }
}

function mapStateToProps(state) {
  return {
    entries: selectors.getEntries(state),
    isEntryCreating: selectors.isEntryCreating(state),
    updatingEntryId: selectors.getUpdatingEntryId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createEntry: fields => dispatch(createEntry(fields)),
    deleteEntry: id => dispatch(deleteEntry(id)),
    fetchEntries: () => dispatch(fetchEntries()),
    updateEntry: (id, fields) => dispatch(updateEntry(id, fields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesIndexPage);
