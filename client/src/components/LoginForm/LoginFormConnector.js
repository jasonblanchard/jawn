import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Connector from 'state/Connector';
import getInState from 'state/selectors/getInState';

import validate from './validate';

function mapStateToProps(state) {
  return {
    submitting: Boolean(getInState(state, 'loginStarted')),
    submitFailed: Boolean(getInState(state, 'loginFailed')),
  };
}

export default reduxForm({
  form: 'login',
  validate,
  onSubmit: ({ username, password }, dispatch) => dispatch({ type: 'LOGIN', username, password }),
})(connect(mapStateToProps)(Connector));
