import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'Root';
import RootConnector from 'Root/RootConnector';
import bootstrapStore from './state/bootstrapStore';

const store = bootstrapStore({
  location: {
    routeId: 'workspace',
  },
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
