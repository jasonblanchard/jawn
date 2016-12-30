import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import EntryForm from 'src/components/EntryForm';
import createEntry from 'src/actions/createEntry';
import selectors from 'src/state/selectors';

class EntriesIndexPage extends Component {
  static propTypes = {
    entries: PropTypes.array,
    createEntry: PropTypes.func
  }

  static defaultProps = {
    entries: []
  }

  render() {
    return (
      <div>
        <EntryForm onSubmit={this.props.createEntry} />
        {this.props.entries.length === 0 ? "No entries yet" : this.props.entries.reverse().map(this._renderEntry)}
      </div>
    );
  }

  _renderEntry(entry) {
    return (
      <div key={entry.id}>
        {entry.timeCreated}
        <p>{entry.text}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    entries: selectors.getEntries(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createEntry: (fields) => dispatch(createEntry(fields))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesIndexPage);
