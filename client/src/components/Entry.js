import React, { PropTypes, PureComponent } from 'react';

import EntryForm from 'src/components/EntryForm';

export default class Entry extends PureComponent {
  static propTypes = {
    entry: PropTypes.object,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    onSubmit: () => {}
  }

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    }

    this._handleDoubleClick = this._handleDoubleClick.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleClickCancel = this._handleClickCancel.bind(this);
  }

  render() {
    if (this.state.isEditing) return (
      <div>
        <EntryForm entry={this.props.entry} onSubmit={this._handleSubmit} />
        <button onClick={this._handleClickCancel}>Cancel</button>
      </div>
    );

    return (
      <div onDoubleClick={this._handleDoubleClick}>
        {this.props.entry.timeCreated}
        <p>{this.props.entry.text}</p>
      </div>
    );
  }

  _handleDoubleClick() {
    this.setState({ isEditing: true });
  }

  _handleClickCancel() {
    this.setState({ isEditing: false });
  }

  _handleSubmit(changes) {
    this.props.onSubmit(this.props.entry.id, changes);
    this.setState({ isEditing: false });
  }
}
