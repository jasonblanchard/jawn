import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Field } from 'redux-form';

export default class LoginForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    submitFailed: PropTypes.bool,
    submitting: PropTypes.bool,
    valid: PropTypes.bool,
  }

  render() {
    const { handleSubmit, valid, submitting, submitFailed } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field id="username" label="Username: " name="username" component={this.renderField} type="text" />
        <Field id="password" label="Password: " name="password" component={this.renderField} type="password" />
        <button disabled={!valid || submitting} type="submit">{submitting ? 'Submitting...' : 'Submit'}</button>
        {submitFailed && <div>Nope</div>}
      </form>
    );
  }

  renderField({ input, label, type, id, meta: { touched, error } }) {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input {...input} type={type} />
        {touched && (error && <span>{error}</span>)}
      </div>
    );
  }
}
