import PropTypes from 'prop-types';
import React, { Component } from 'react';

import css from './EntryForm.scss';

export default class EntryForm extends Component {
  static propTypes = {
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
        <footer>
          <button disabled={this.props.isDisabled} type="submit">submit</button>
          <button type="button" onClick={this.props.onCancel}>cancel</button>
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
}
