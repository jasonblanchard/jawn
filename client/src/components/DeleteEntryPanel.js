import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Connector from 'src/state/Connector';
import connectToAppProvider from 'src/state/connectToAppProvider';

export default class DeletEntryPanel extends Component {
  static propTypes = {
    entryId: PropTypes.string,
    handleClickConfirm: PropTypes.func,
  }

  static defaultProps = {
    handleClickConfirm: () => {},
  }

  state = {
    isDeleteConfirmationOpen: false,
  }

  render() {
    if (this.state.isDeleteConfirmationOpen) {
      return (
        <div>
          Are you sure?
          <button key="confirm" type="button" onClick={this.handleClickConfirm}>yes</button>
          <button key="cancel" type="button" onClick={this.handleClickCancelDelete}>nah</button>
        </div>
      );
    }

    return (
      <div>
        <button type="button" onClick={this.handleClickDelete}>delete</button>
      </div>
    );
  }

  handleClickConfirm = () => {
    this.props.handleClickConfirm(this.props.entryId);
  }

  handleClickDelete = () => {
    this.setState({ isDeleteConfirmationOpen: true });
  }

  handleClickCancelDelete = () => {
    this.setState({ isDeleteConfirmationOpen: false });
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteEntry: id => dispatch({ type: 'DELETE_ENTRY', id }),
  };
}

export const DeleteEntryPanelConnector = connectToAppProvider(undefined, mapDispatchToProps)(Connector);
