import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';

import './EntryForm.css';

export default class EntryForm extends PureComponent {
  static propTypes = {
    entry: PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    }),
    className: PropTypes.string,
    onSubmit: PropTypes.func,
  }

  static defaultProps = {
    entry: {},
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
          aria-label="text"
          value={this.state.text || ''}
          onKeyDown={this._handleKeyDown}
          onChange={this._handleChange}
        />
        <button>{this.props.entry.id ? 'Update' : 'Create'}</button>
      </form>
    );
  }

  _handleChange(event) {
    this.setState({ text: event.target.value });
  }

  _handleKeyDown(event) {
    const { metaKey, keyCode } = event;
    if (metaKey && keyCode === 13) {
      this._handleSubmit();
    }
  }

  _handleSubmit(event) {
    if (event) event.preventDefault();
    this.props.onSubmit(this._getFormData());
    this.setState({ text: null });
  }

  _getFormData() {
    return {
      text: this.state.text,
    };
  }
}
