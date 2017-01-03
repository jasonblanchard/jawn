import { Actions as FarceActions } from 'farce';
import { Provider } from 'react-redux';
import { resolveElements } from 'found';
import Immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'src/routes';
import createStore from 'src/createStore';

import './index.css';

const initialAppState = Object.assign({}, JSON.parse(localStorage.getItem('appState'))); // TODO: Merge with window.__initialAppState
const store = createStore({ app: Immutable.fromJS(initialAppState) });

store.dispatch(FarceActions.init());

ReactDOM.render(
  <Provider store={store}>
    <Router resolveElements={resolveElements} matchContext={{ store }} />
  </Provider>,
  document.getElementById('root'),
);
