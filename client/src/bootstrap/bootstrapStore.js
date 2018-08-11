import { createStore, compose } from 'redux';
import { install, reduceReducers } from 'redux-loop';
import reducers from 'state/reducers';

/* eslint-disable no-underscore-dangle */
const enhancer = compose(
  install(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default function bootstrapStore(registry) {
  function reducer(state, action) {
    return reduceReducers(...reducers)(state, action, registry);
  }

  return createStore(
    reducer,
    {},
    enhancer,
  );
}
