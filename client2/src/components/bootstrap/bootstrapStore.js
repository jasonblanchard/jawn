import { compose, createStore, applyMiddleware } from 'redux';
import Immutable from 'immutable';
import thunk from 'redux-thunk';

import reducers from 'src/state/reducers';

const LOG_TAG = 'bootstrapStore';

export default function(registry) {
  const { logger } = registry;

  const appReducer = (state = Immutable.Map(), action) => {
    const type = action.type.split(/_(STARTED|COMPLETED|FAILED)/)[0];
    const reduce = reducers[type];
    return reduce ? reduce(state, action) : state;
  };

  const initialState = Immutable.fromJS(window.__INITIAL_STATE);
  logger.debug({ initialState }, LOG_TAG);

  return createStore(
    appReducer,
    initialState,
    compose(
      applyMiddleware(thunk.withExtraArgument(registry)),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : createStore => createStore,
    ),
  );
}
