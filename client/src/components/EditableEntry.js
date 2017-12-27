import PropTypes from 'prop-types';
import React, { Component } from 'react';

import connectToAppProvider from 'src/state/connectToAppProvider';
import Entry from 'src/components/Entry';
import { EditEntryFormContainer } from 'src/components/EditEntryForm';

import css from './EditableEntry.scss';

export default class EditableEntry extends Component {
  static propTypes = {
    didUpdateEntryId: PropTypes.string,
    entry: PropTypes.object,
    onClickDeleteEntry: PropTypes.func,
  };

  static defaultProps = {
    onClickDeleteEntry: () => {},
  }

  state = {
    isDeleteConfirmationOpen: false,
    isSelected: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didUpdateEntryId === this.props.entry.id) {
      this.setState({
        isSelected: false,
      });
    }
  }

  render() {
    const { isSelected } = this.state;
    return (
      <div className={css.container} onDoubleClick={this.select}>
        {isSelected ? null : <button className={css.selectButton} onClick={this.select}>edit</button>}
        {isSelected ? this.renderEditEntryForm() : <Entry className={css.entry} {...this.props} />}
      </div>
    );
  }

  renderEditEntryForm() {
    return (
      <EditEntryFormContainer focusOnMount onCancel={this.deselect} {...this.props}>
        {this.renderEntryFormActions()}
      </EditEntryFormContainer>
    );
  }

  renderEntryFormActions() {
    if (this.state.isDeleteConfirmationOpen) {
      return (
        <div>
          Are you sure?
          <button type="button" onClick={this.handleClickConfirmDelete}>yes</button>
          <button type="button" onClick={this.handleClickCancelDelete}>nah</button>
        </div>
      );
    }

    return (
      <div>
        <button type="button" onClick={this.deselect}>cancel</button>
        <button type="button" onClick={this.handleClickDelete}>delete</button>
      </div>
    );
  }

  select = () => {
    this.setState({ isSelected: true });
  }

  deselect = () => {
    this.setState({ isSelected: false });
  }

  handleClickDelete = () => {
    this.setState({
      isDeleteConfirmationOpen: true,
    });
  }

  handleClickConfirmDelete = () => {
    this.props.onClickDeleteEntry(this.props.entry.id);
  }

  handleClickCancelDelete = () => {
    this.setState({
      isDeleteConfirmationOpen: false,
    });
  }
}

function mapStateToProps(state) {
  return {
    didUpdateEntryId: state.didUpdateEntryId,
  };
}

function mapActionsToProps(actions) {
  return {
    onClickDeleteEntry: actions.deleteEntry,
  };
}

export const EditableEntryContainer = connectToAppProvider(mapStateToProps, mapActionsToProps)(EditableEntry);