import { Actions as FarceActions } from 'farce';
import { Provider } from 'react-redux';
import { resolveElements } from 'found';
import bootstrap from 'src/bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'src/routes';

import './index.css';

const LOG_TAG = 'entrypoint';

const registry = bootstrap();
const { logger, store } = registry;

logger.debug('>>> bootstrapping <<<', LOG_TAG);

store.dispatch(FarceActions.init());

ReactDOM.render(
  <Provider store={store}>
    <Router resolveElements={resolveElements} matchContext={{ store }} />
  </Provider>,
  document.getElementById('root'),
);
