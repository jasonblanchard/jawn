import { createStore } from 'redux';

function reducer(state /* , action */) {
  return state;
}

/* eslint-disable no-underscore-dangle */
export default function bootstrapStore(initialState = {}) {
  return createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}
