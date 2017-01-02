import { createConnectedRouter, createRender } from 'found';
import React from 'react';

import EntriesIndexPage from 'src/pages/EntriesIndexPage';
import fetchEntries from 'src/actions/fetchEntries';
import LoginPage from 'src/pages/LoginPage';

export default [
  {
    path: '/login',
    Component: LoginPage,
    getData: () => {
      // TODO: Dispatch something and redirect if already logged in
    },
  },
  {
    path: '/',
    Component: EntriesIndexPage,
    getData: ({ context }) => {
      context.store.dispatch(fetchEntries());
    },
  },
];

export const Router = createConnectedRouter({
  render: createRender({
    renderError: ({ error }) => ( // eslint-disable-line react/prop-types
      <div>
        {error.status === 404 ? 'Not found' : 'Error'}
      </div>
    ),
  }),
});
