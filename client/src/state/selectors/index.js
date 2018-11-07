import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';

import TokenUtils from 'utils/TokenUtils';

import schema from 'state/entities/schema';

export default {
  getEntries: createSelector(
    state => (state.entityIds ? state.entityIds.entries : []),
    state => state.entities,
    (entryIds, entities) => {
      if (!entities) return [];
      return denormalize(entryIds, schema.entries, entities) || [];
    },
  ),

  // NOTE: This selector isn't pure since it's reaching into the access token cookie, but we really want that to be the source of truth to make sure it stops working when the cookie is destroyed.
  getAuthenticatedUser: state => {
    if (!state.entities) return undefined;
    const accessToken = TokenUtils.getAccessToken();
    if (!accessToken) return undefined;
    const userId = TokenUtils.decodeUserId(accessToken);
    return denormalize(userId, schema.user, state.entities);
  },
};
