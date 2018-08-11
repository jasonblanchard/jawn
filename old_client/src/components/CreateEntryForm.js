import PropTypes from 'prop-types';
import React, { Component } from 'react';

import connectToAppProvider from 'src/state/connectToAppProvider';

import EntryForm from './EntryForm';

export default class CreateEntryForm extends Component {
  static propTypes = {
    createEntry: PropTypes.func.isRequired,
    didCreateEntry: PropTypes.bool,
    entry: PropTypes.object,
    isCreatingEntry: PropTypes.bool,
  }

  render() {
    return (
      <EntryForm
        clear={this.props.didCreateEntry}
        onSubmit={this.handleSubmit}
        isDisabled={this.props.isCreatingEntry}
        {...this.props}
      />
    );
  }

  handleSubmit = ({ text }) => {
    this.props.createEntry({ text });
  }
}

function mapStateToProps(state) {
  return {
    didCreateEntry: state.didCreateEntry,
    isCreatingEntry: state.isCreatingEntry,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createEntry: input => dispatch({ type: 'CREATE_ENTRY', input }),
  };
}

export const CreateEntryFormContainer = connectToAppProvider(mapStateToProps, mapDispatchToProps)(CreateEntryForm);
