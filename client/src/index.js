import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'src/bootstrap';

import Root from 'Root';
import RootConnector from 'Root/RootConnector';
import actions from 'state/actions';

const registry = bootstrap();
const { store } = registry;

store.dispatch(actions.resolveLocation());

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
