import createHistory from 'history/createBrowserHistory';

export default function(registry) {
  const { store } = registry;
  const history = createHistory();

  history.listen(location => {
    store.dispatch({ type: 'RESOLVE_LOCATION', location });
  });

  return history;
}
