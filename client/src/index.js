import {
  Actions as FarceActions,
  BrowserProtocol,
  createHistoryEnhancer,
  queryMiddleware
} from 'farce';
import {
  createConnectedRouter,
  createMatchEnhancer,
  createRender,
  foundReducer,
  Matcher,
  resolveElements
} from 'found';
import { Provider } from 'react-redux';
import { combineReducers, compose, createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

import routes from 'src/routes';

import './index.css';

const store = createStore(
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

store.dispatch(FarceActions.init());

const ConnectedRouter = createConnectedRouter({
  render: createRender({
    renderError: ({ error }) => (
      <div>
        {error.status === 404 ? 'Not found' : 'Error'}
      </div>
    ),
  })
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter resolveElements={resolveElements} matchContext={{ store }} />
  </Provider>,
  document.getElementById('root'),
);
