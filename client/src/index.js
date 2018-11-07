import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'src/bootstrap';

import Root from 'Root';
import RootConnector from 'Root/RootConnector';
import actions from 'state/actions';
import theme from 'styles/theme';

const registry = bootstrap();
const { store } = registry;

store.dispatch(actions.resolveLocation());

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <RootConnector>
        {stateProps => (
          <Root {...stateProps} />
        )}
      </RootConnector>
    </Provider>
  </ThemeProvider>,
  document.getElementById('app'),
);
