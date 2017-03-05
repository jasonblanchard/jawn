import classNames from 'classnames';
import isEmpty from 'lodash.isempty';
import React, { PureComponent, PropTypes } from 'react';

import './EntryForm.css';

export default class EntryForm extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    entry: PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    }),
    isDisabled: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
  }

  static defaultProps = {
    entry: {},
    onCancel: () => {},
    onSubmit: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      text: props.entry.text,
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  render() {
    const className = classNames('EntryForm', this.props.className);
    return (
      <form className={className} onSubmit={this._handleSubmit}>
        <textarea
          className="EntryForm-textInput"
          ref={element => { this.textInput = element; }}
          aria-label="text"
          value={this.state.text || ''}
          onKeyDown={this._handleKeyDown}
          onChange={this._handleChange}
        />
        <div className="EntryForm-actions">
          <button type="submit" disabled={this.props.isDisabled || !this._canSubmit()}>{this.props.entry.id ? 'Update' : 'Create'}</button>
          {this.props.children}
        </div>
      </form>
    );
  }

  reset() {
    this.setState({ text: null });
  }

  focus() {
    this.textInput.focus();
  }

  _handleChange(event) {
    this.setState({ text: event.target.value });
  }

  _handleKeyDown(event) {
    const { metaKey, keyCode } = event;
    if (metaKey && keyCode === 13) {
      this._handleSubmit();
    }

    if (keyCode === 27) {
      this.props.onCancel();
    }
  }

  _handleSubmit(event) {
    if (event) event.preventDefault();
    this.props.onSubmit(this._getFormData());
  }

  _getFormData() {
    return {
      text: this.state.text,
    };
  }

  _canSubmit() {
    return !isEmpty(this.state.text);
  }
}
