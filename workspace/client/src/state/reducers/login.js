export default function(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, loginStarted: true, loginFailed: undefined };
    case 'LOGIN_SUCCEEDED':
      return { ...state, loginStarted: undefined };
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
