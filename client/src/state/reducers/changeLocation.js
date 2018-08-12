import { loop, Cmd } from 'redux-loop';

import updateLocation from 'state/effects/updateLocation';

export default function(state, action, registry) {
  switch (action.type) {
    case 'CHANGE_LOCATION':
      return loop(
        state,
        Cmd.run(updateLocation, {
          args: [action.method || 'push', action.path, registry],
        }),
      );
    default:
      return state;
  }
}
