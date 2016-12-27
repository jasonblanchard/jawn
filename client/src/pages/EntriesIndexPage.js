import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import selectors from 'src/state/selectors';

class EntriesIndexPage extends Component {
  static propTypes = {
    entries: PropTypes.array
  }

  static defaultProps = {
    entries: []
  }

  render() {
    if (this.props.entries.length === 0) return <div>No entries yet</div>;
    return <div>{this.props.entries.reverse().map(this._renderEntry)}</div>;
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

export default connect(mapStateToProps)(EntriesIndexPage);
