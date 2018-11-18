import createHistory from 'history/createBrowserHistory';

import actions from 'state/actions';

export default function(registry) {
  const { store } = registry;
  const history = createHistory();

  history.listen(() => {
    store.dispatch(actions.resolveLocation());
  });

  return history;
}
