import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { frame } from 'redux-frame';

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
  onSubmit: ({ username, password }, dispatch) => dispatch({
    type: frame('LOGIN'),
    username,
    password,
    interceptors: [
      ['effect', { effectId: 'debug' }],
      ['effect', { effectId: 'dispatch' }],
      ['effect', {
        effectId: 'http',
        args: {
          method: 'post',
          path: '/api/login',
          body: { username, password },
          onSuccessAction: {
            type: frame('LOGIN_SUCCEEDED'),
            interceptors: [
              ['effect', { effectId: 'dispatch' }],
              ['injectCoeffects', { coeffectId: 'registry' }],
              ['effect', { effectId: 'changeLocation', args: { path: '/workspace' } }],
            ],
          },
          onFailureAction: {
            type: frame('LOGIN_FAILED'),
            interceptors: [
              ['effect', { effectId: 'dispatch' }],
            ],
          },
        },
      }],
    ],
  }),
})(connect(mapStateToProps)(Connector));
