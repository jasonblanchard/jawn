import gql from 'graphql-tag';
import moment from 'moment';
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

  static fragments = {
    entry: gql`
      fragment EditableEntry_entry on Entry {
        ...EntryComponent_entry
      }
      ${Entry.fragments.entry}
    `,
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
        <div className={css.date}>
          {moment(this.props.entry.timeCreated).format('MMMM Do YYYY, h:mm a')}
          {this.props.entry.timeUpdated ? ` • updated ${moment(this.props.entry.timeUpdated).format('MMMM Do YYYY, h:mm a')}` : null}
        </div>
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
          <button key="confirm" type="button" onClick={this.handleClickConfirmDelete}>yes</button>
          <button key="cancel" type="button" onClick={this.handleClickCancelDelete}>nah</button>
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

function mapDispatchToProps(dispatch) {
  return {
    onClickDeleteEntry: id => dispatch({ type: 'DELETE_ENTRY', id }),
  };
}

export const EditableEntryContainer = connectToAppProvider(mapStateToProps, mapDispatchToProps)(EditableEntry);
