import React, { PureComponent, PropTypes } from 'react';

export default class EntryForm extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    onSubmit: () => {}
  }

  constructor(props) {
    super(props);

    this.state = {
      text: undefined
    }

    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <textarea
          className="EntryForm-textInput"
          aria-label="text"
          value={this.state.text}
          onChange={this._handleChange}
        />
        <button>Submit</button>
      </form>
    );
  }

  _handleChange(event) {
    this.setState({ text: event.target.value });
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this._getFormData());
  }

  _getFormData() {
    return {
      text: this.state.text
    }
  }
}
