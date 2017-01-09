import Bottle from 'bottlejs';

import bootstrapAuthenticationService from './bootstrapAuthenticationService';
import bootstrapLogger from './bootstrapLogger';
import bootstrapStore from './bootstrapStore';

export default function() {
  const bottle = new Bottle();

  bottle.factory('authenticationService', bootstrapAuthenticationService);
  bottle.factory('logger', bootstrapLogger);
  bottle.factory('store', bootstrapStore);

  return bottle.container;
}
