import { combineReducers, compose, createStore } from 'redux';
import { BrowserProtocol, createHistoryEnhancer, queryMiddleware } from 'farce';
import { createMatchEnhancer, foundReducer, Matcher } from 'found';

import routes from 'src/routes';

export default function() {
  return createStore(
    combineReducers({
      found: foundReducer,
    }),
    compose(
      createHistoryEnhancer({
        protocol: new BrowserProtocol(),
        middlewares: [queryMiddleware],
      }),
      createMatchEnhancer(
        new Matcher(routes),
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
  );
}
