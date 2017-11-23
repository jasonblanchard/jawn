import PropTypes from 'prop-types';
import React, { Component } from 'react';

import connectToAppProvider from 'src/state/connectToAppProvider';

export default class EntryForm extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
  }

  state = {
    ...this.props.initialValues,
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="EntryForm-textInput" />
        <textarea
          id="EntryForm-textInput"
          ref={element => { this.textInput = element; }}
          name="text"
          value={this.state.text || ''}
          onChange={this.handleChangeTextInput}
          onKeyDown={this.handleKeyDown}
        />
        <button>submit</button>
      </form>
    );
  }

  componentDidMount() {
    this.textInput.focus();
  }

  handleChangeTextInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = event => {
    if (event) event.preventDefault();
    this.props.onSubmit({ text: this.state.text });
  }

  handleKeyDown = event => {
    const { metaKey, keyCode } = event;
    if (metaKey && keyCode === 13) {
      this.handleSubmit();
    }

    if (keyCode === 27) {
      this.props.onCancel();
    }
  }
}

class EntryFormContainer extends Component {
  static propTypes = {
    entry: PropTypes.object,
    updateEntry: PropTypes.func.isRequired,
  }

  render() {
    return (
      <EntryForm initialValues={{ text: this.props.entry.text }} onSubmit={this.handleSubmit} {...this.props} />
    );
  }

  handleSubmit = ({ text }) => {
    this.props.updateEntry(this.props.entry.id, { text });
  }
}

function mapActionsToProps(actions) {
  return {
    updateEntry: actions.updateEntry,
  };
}

export const ConnectedEntryForm = connectToAppProvider(undefined, mapActionsToProps)(EntryFormContainer);
