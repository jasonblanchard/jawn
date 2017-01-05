import Bottle from 'bottlejs';

import bootstrapApp from './bootstrapApp';
import bootstrapEntryController from './bootstrapEntryController';
import bootstrapEntryService from './bootstrapEntryService';
import bootstrapLogger from './bootstrapLogger';
import bootstrapLoginController from './bootstrapLoginController';
import bootstrapStore from './bootstrapStore';
import bootstrapUserService from './bootstrapUserService';

export default function() {
  const bottle = new Bottle();

  bottle.factory('app', bootstrapApp);
  bottle.factory('entryController', bootstrapEntryController);
  bottle.factory('entryService', bootstrapEntryService);
  bottle.factory('logger', bootstrapLogger);
  bottle.factory('loginController', bootstrapLoginController);
  bottle.factory('store', bootstrapStore);
  bottle.factory('userService', bootstrapUserService);

  return bottle.container;
}
