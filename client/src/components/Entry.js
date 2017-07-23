import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import moment from 'moment';

import EntryForm from 'src/components/EntryForm';

import './Entry.css';

export default class Entry extends PureComponent {
  static propTypes = {
    entry: PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      timeCreated: PropTypes.string,
      timeUpdated: PropTypes.string,
    }),
    isEntryFormDisabled: PropTypes.bool,
    onClickDelete: PropTypes.func,
    onSubmitEntryForm: PropTypes.func,
  }

  static defaultProps = {
    onClickDelete: () => {},
    onSubmitEntryForm: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      isDeleteConfirmationVisible: false,
      isEditing: false,
    };

    this._handleDoubleClick = this._handleDoubleClick.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleClickCancel = this._handleClickCancel.bind(this);
    this._handleClickDelete = this._handleClickDelete.bind(this);
    this._handleClickEditButton = this._handleClickEditButton.bind(this);
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div>
          <EntryForm className="Entry Entry-form" ref={element => { this.entryForm = element; }} isDisabled={this.props.isEntryFormDisabled} entry={this.props.entry} onSubmit={this._handleSubmit} onCancel={this._handleClickCancel}>
            <div className="Entry-entryFormActions">
              {this.state.isDeleteConfirmationVisible ? this._renderDeleteConfirmation() : this._renderEntryFormActions()}
            </div>
          </EntryForm>
        </div>
      );
    }

    return (
      <div className="Entry">
        <div className="Entry-meta">
          <div className="Entry-date">
            {moment(this.props.entry.timeCreated).format('MMMM Do YYYY, h:mm a')}
            {this.props.entry.timeUpdated ? ` • updated ${moment(this.props.entry.timeUpdated).format('MMMM Do YYYY, h:mm a')}` : null}
          </div>
          <button onClick={this._handleClickEditButton}>edit</button>
        </div>
        <p className="Entry-text" onDoubleClick={this._handleDoubleClick}>{this.props.entry.text}</p>
      </div>
    );
  }

  _renderEntryFormActions() {
    return (
      <div className="Entry-entryFormActions">
        <button type="button" onClick={this._handleClickCancel}>Cancel</button>
        <button type="button" onClick={this._handleClickToggleDeleteConfirmation.bind(this, true)}>Delete</button>
      </div>
    );
  }

  _renderDeleteConfirmation() {
    return (
      <div>
        Are you sure you want to delete it?
        <button type="button" onClick={this._handleClickDelete}>Yep</button>
        <button type="button" onClick={this._handleClickToggleDeleteConfirmation.bind(this, false)}>Nope</button>
      </div>
    );
  }

  _handleDoubleClick() {
    this._setIsEditing();
  }

  _handleClickEditButton() {
    this._setIsEditing();
  }

  _setIsEditing() {
    this.setState({ isEditing: true }, () => {
      this.entryForm.focus();
    });
  }

  _handleClickCancel() {
    this.setState({ isEditing: false, isDeleteConfirmationVisible: false });
  }

  _handleSubmit(changes) {
    this.props.onSubmitEntryForm(this.props.entry.id, changes)
      .then(() => {
        this.setState({ isEditing: false, isDeleteConfirmationVisible: false });
      });
  }

  _handleClickToggleDeleteConfirmation(isDeleteConfirmationVisible) {
    this.setState({ isDeleteConfirmationVisible });
  }

  _handleClickDelete() {
    this.props.onClickDelete(this.props.entry.id);
  }
}
