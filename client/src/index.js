import { Provider } from 'react-redux';
import bootstrap from 'src/bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';

import RootPage from 'src/pages/RootPage';

import './index.css';

const LOG_TAG = 'entrypoint';

const registry = bootstrap();
const { logger, store } = registry;

logger.debug('>>> bootstrapping <<<', LOG_TAG);

ReactDOM.render(
  <Provider store={store}>
    <RootPage />
  </Provider>,
  document.getElementById('root'),
);
