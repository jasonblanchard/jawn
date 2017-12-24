import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isBlank from 'underscore.string/isBlank';

import css from './EntryForm.scss';

export default class EntryForm extends Component {
  static propTypes = {
    children: PropTypes.node,
    clear: PropTypes.bool,
    focusOnMount: PropTypes.bool,
    initialValues: PropTypes.object,
    isDisabled: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
  }

  state = {
    ...this.props.initialValues,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clear) {
      this.setState({
        text: undefined,
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          className={css.textInput}
          id="EntryForm-textInput"
          aria-label="Entry text"
          ref={element => { this.textInput = element; }}
          name="text"
          value={this.state.text || ''}
          onChange={this.handleChangeTextInput}
          onKeyDown={this.handleKeyDown}
        />
        <footer className={css.footer}>
          <button disabled={!this.canSubmit()} type="submit">submit</button>
          {this.props.children}
        </footer>
      </form>
    );
  }

  componentDidMount() {
    if (this.props.focusOnMount) this.textInput.focus();
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

  canSubmit() {
    return !this.props.isDisabled && !isBlank(this.state.text);
  }
}
