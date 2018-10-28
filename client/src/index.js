import { frame } from 'redux-frame';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'src/bootstrap';

import Root from 'Root';
import RootConnector from 'Root/RootConnector';

const registry = bootstrap();
const { store } = registry;

store.dispatch({
  type: frame('RESOLVE_LOCATION'),
  interceptors: [
    ['effect', { effectId: 'debug' }],
    ['injectCoeffects', { coeffectId: 'registry' }],
    ['injectCoeffects', { coeffectId: 'location' }],
    'locationToRouteId',
    ['path', { from: 'routeId', to: 'action.routeId' }],
    ['effect', { effectId: 'dispatch' }],
  ],
});

ReactDOM.render(
  <Provider store={store}>
    <RootConnector>
      {stateProps => (
        <Root {...stateProps} />
      )}
    </RootConnector>
  </Provider>,
  document.getElementById('app'),
);
