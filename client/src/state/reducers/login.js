import { loop, Cmd } from 'redux-loop';

import login from 'state/effects/login';

export default function(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return loop(
        { ...state, loginStarted: true, loginFailed: undefined },
        Cmd.run(login, {
          args: [action.username, action.password],
          successActionCreator: () => ({ type: 'LOGIN_SUCCEEDED' }),
          failActionCreator: () => ({ type: 'LOGIN_FAILED' }),
        }),
      );
    case 'LOGIN_SUCCEEDED':
      return loop(
        { ...state, loginStarted: undefined, loginSucceeded: true },
        Cmd.action({ type: 'CHANGE_LOCATION', path: '/workspace' }),
      );
    case 'LOGIN_FAILED':
      return {
        ...state,
        loginFailed: true,
        loginStarted: undefined,
      };
    default:
      return state;
  }
}
