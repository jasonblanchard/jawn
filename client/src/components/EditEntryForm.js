import PropTypes from 'prop-types';
import React, { Component } from 'react';

import connectToAppProvider from 'src/state/connectToAppProvider';

import EntryForm from './EntryForm';

export default class EditEntryForm extends Component {
  static propTypes = {
    entry: PropTypes.object,
    updateEntry: PropTypes.func.isRequired,
    isUpdatingEntryId: PropTypes.string,
  }

  render() {
    return (
      <EntryForm
        initialValues={{ text: this.props.entry.text }}
        onSubmit={this.handleSubmit}
        isDisabled={this.props.isUpdatingEntryId === this.props.entry.id}
        {...this.props}
      />
    );
  }

  handleSubmit = ({ text }) => {
    this.props.updateEntry(this.props.entry.id, { text });
  }
}

function mapStateToProps(state) {
  return {
    isUpdatingEntryId: state.isUpdatingEntryId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateEntry: (id, input) => dispatch({ type: 'UPDATE_ENTRY', id, input }),
  };
}

export const EditEntryFormContainer = connectToAppProvider(mapStateToProps, mapDispatchToProps)(EditEntryForm);
