import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'src/bootstrap';

import Root from 'Root';
import RootConnector from 'Root/RootConnector';

const registry = bootstrap();
const { store, history } = registry;

store.dispatch({ type: 'RESOLVE_LOCATION', location: history.location });

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
