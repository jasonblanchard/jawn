import React, { PropTypes, PureComponent } from 'react';

import EntryForm from 'src/components/EntryForm';

export default class Entry extends PureComponent {
  static propTypes = {
    entry: PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      timeCreated: PropTypes.string,
    }),
    onDelete: PropTypes.func,
    onSubmit: PropTypes.func,
  }

  static defaultProps = {
    onDelete: () => {},
    onSubmit: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };

    this._handleDoubleClick = this._handleDoubleClick.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleClickCancel = this._handleClickCancel.bind(this);
    this._handleClickDelete = this._handleClickDelete.bind(this);
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div>
          <EntryForm entry={this.props.entry} onSubmit={this._handleSubmit} />
          <button onClick={this._handleClickCancel}>Cancel</button>
        </div>
      );
    }

    return (
      <div onDoubleClick={this._handleDoubleClick}>
        {this.props.entry.timeCreated}
        <p>{this.props.entry.text}</p>
        <button onClick={this._handleClickDelete}>Delete</button>
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

  _handleClickDelete(event) {
    event.stopPropagation();
    this.props.onDelete(this.props.entry.id);
  }
}
