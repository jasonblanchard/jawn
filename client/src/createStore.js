import { combineReducers, compose, createStore } from 'redux';
import { BrowserProtocol, createHistoryEnhancer, queryMiddleware } from 'farce';
import { createMatchEnhancer, foundReducer, Matcher } from 'found';

import reducers from 'src/state/reducers';
import routes from 'src/routes';

const createReducer = function() {
  return (state, action) => {
    const type = action.type.split(/_(STARTED|COMPLETED|FAILED)/)[0];
    const reduce = reducers[type];
    return reduce ? reduce(state, action) : combineReducers({ found: foundReducer })(state, action);
  };
}

export default function() {
  return createStore(
    createReducer(),
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
