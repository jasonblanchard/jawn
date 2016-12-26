import http from 'superagent';

import EntriesIndexPage from 'src/pages/EntriesIndexPage';

export default [
  {
    path: '/',
    Component: EntriesIndexPage,
    getData: ({ context }) => {
      context.store.dispatch({ type: 'LOAD_ENTRIES_INDEX_PAGE_STARTED' });
      return http.get('/api/entries')
        .then(response => {
          const entries = response.body;
          context.store.dispatch({ type: 'LOAD_ENTRIES_INDEX_PAGE_COMPLETED', entries });
        })
        .catch(error => {
          context.store.dispatch({ type: 'LOAD_ENTRIES_INDEX_PAGE_FAILED', error });
        });
    }
  }
];
