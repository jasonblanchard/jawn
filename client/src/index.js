import { Actions as FarceActions } from 'farce';
import { Provider } from 'react-redux';
import { resolveElements } from 'found';
import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'src/routes';
import createStore from 'src/createStore';

import './index.css';

const store = createStore();

store.dispatch(FarceActions.init());

ReactDOM.render(
  <Provider store={store}>
    <Router resolveElements={resolveElements} matchContext={{ store }} />
  </Provider>,
  document.getElementById('root'),
);
