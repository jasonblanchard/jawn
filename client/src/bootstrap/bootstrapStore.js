import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { BrowserProtocol, createHistoryEnhancer, queryMiddleware } from 'farce';
import { createMatchEnhancer, foundReducer, Matcher } from 'found';
import Immutable from 'immutable';
import thunk from 'redux-thunk';

import reducers from 'src/state/reducers';
import routes from 'src/routes';

const LOG_TAG = 'bootstrapStore';

export default function(registry) {
  const { logger } = registry;

  const appReducer = (state = Immutable.Map(), action) => {
    const type = action.type.split(/_(STARTED|COMPLETED|FAILED)/)[0];
    const reduce = reducers[type];
    return reduce ? reduce(state, action) : state;
  };

  const initialAppState = Object.assign({}, JSON.parse(localStorage.getItem('appState'))); // TODO: Merge with window.__initialAppState
  const initialState = { app: Immutable.fromJS(initialAppState) };
  logger.debug({ initialState }, LOG_TAG);

  return createStore(
    combineReducers({ found: foundReducer, app: appReducer }),
    initialState,
    compose(
      createHistoryEnhancer({
        protocol: new BrowserProtocol(),
        middlewares: [queryMiddleware],
      }),
      createMatchEnhancer(
        new Matcher(routes),
      ),
      applyMiddleware(thunk.withExtraArgument(registry)),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
}
