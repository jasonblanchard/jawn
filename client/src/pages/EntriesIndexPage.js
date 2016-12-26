import React, { Component, PropTypes } from 'react';

export default class EntriesIndexPage extends Component {
  static propTypes = {
    entries: PropTypes.array
  }

  static defaultProps = {
    entries: []
  }

  render() {
    if (this.props.entries.length === 0) return <div>No entries yet</div>;
    this.props.entries.map(this._renderEntry);
  }

  _renderEntry(entry) {
    return (
      <div>
        {entry.timeCreated}
        <p>{entry.text}</p>
      </div>
    )
  }
}
