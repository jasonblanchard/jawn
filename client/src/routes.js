import { createConnectedRouter, createRender } from 'found';
import React from 'react';

import EntriesIndexPage from 'src/pages/EntriesIndexPage';
import fetchEntries from 'src/actions/fetchEntries';

export default [
  {
    path: '/',
    Component: EntriesIndexPage,
    getData: ({ context }) => {
      context.store.dispatch(fetchEntries());
    }
  }
];

export const Router = createConnectedRouter({
  render: createRender({
    renderError: ({ error }) => (
      <div>
        {error.status === 404 ? 'Not found' : 'Error'}
      </div>
    ),
  })
});
