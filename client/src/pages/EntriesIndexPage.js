import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import createEntry from 'src/actions/createEntry';
import deleteEntry from 'src/actions/deleteEntry';
import Entry from 'src/components/Entry';
import EntryForm from 'src/components/EntryForm';
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
    updateEntry: PropTypes.func,
  }

  static defaultProps = {
    entries: [],
  }

  render() {
    return (
      <div className="EntriesIndexPage">
        <EntryForm className="EntriesIndexPage-form" onSubmit={this.props.createEntry} />
        {this.props.entries.length === 0 ? 'No entries yet' : this.props.entries.reverse().map(this._renderEntry, this)}
      </div>
    );
  }

  _renderEntry(entry) {
    return <Entry key={entry.id} entry={entry} onSubmit={this.props.updateEntry} onDelete={this.props.deleteEntry} />;
  }
}

function mapStateToProps(state) {
  return {
    entries: selectors.getEntries(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createEntry: fields => dispatch(createEntry(fields)),
    deleteEntry: id => dispatch(deleteEntry(id)),
    updateEntry: (id, fields) => dispatch(updateEntry(id, fields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesIndexPage);
