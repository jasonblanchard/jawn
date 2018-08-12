import { createStore, compose } from 'redux';
import { install as installReduxLoop, reduceReducers, combineReducers } from 'redux-loop';
import { reducer as formReducer } from 'redux-form';

import reducers from 'state/reducers';

/* eslint-disable no-underscore-dangle */
const enhancer = compose(
  installReduxLoop(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default function bootstrapStore(registry) {
  function reducer(state, action) {
    // TODO: Better way to compose these?
    const newState = combineReducers({ form: formReducer })(state, action);
    return reduceReducers(...reducers)(newState, action, registry);
  }

  return createStore(
    reducer,
    {},
    enhancer,
  );
}
