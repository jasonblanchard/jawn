import classNames from 'classnames';
import debounce from 'lodash.debounce';
import isBlank from 'underscore.string/isBlank';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import css from './EntryForm.scss';

export default class EntryForm extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    clear: PropTypes.bool,
    focusOnMount: PropTypes.bool,
    initialValues: PropTypes.object,
    isDisabled: PropTypes.bool,
    // onCancel: PropTypes.func,
    onDebouncedChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onDebouncedChange: () => {},
  }

  constructor(props) {
    super(props);

    // TODO: Parameterize timings
    // TODO: Replace with observable?
    // TODO: Should this even be here? Consider replacing with an onChange prop and moving this logic up.
    this.handleDebouncedOnChange = debounce(() => this.props.onDebouncedChange({ text: this.state.text }), 1000, { maxWait: 2000 });
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
    const className = classNames(css.container, this.props.className);
    return (
      <form className={className} onSubmit={this.handleSubmit}>
        <textarea
          autoFocus={this.props.focusOnMount}
          className={css.textInput}
          id="EntryForm-textInput"
          aria-label="Entry text"
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

  handleChangeTextInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.handleDebouncedOnChange);
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
      // Losing data by mistake, so turning off for now
      // this.props.onCancel();
    }
  }

  canSubmit() {
    return !this.props.isDisabled && !isBlank(this.state.text);
  }
}
