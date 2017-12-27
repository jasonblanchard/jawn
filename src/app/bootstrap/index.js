import Bottle from 'bottlejs';

import bootstrapEntryController from './bootstrapEntryController';
import bootstrapEntryService from './bootstrapEntryService';
import bootstrapGraphqlSchema from './bootstrapGraphqlSchema';
import bootstrapLogger from './bootstrapLogger';
import bootstrapLoginController from './bootstrapLoginController';
import bootstrapServer from './bootstrapServer';
import bootstrapStore from './bootstrapStore';
import bootstrapUserService from './bootstrapUserService';

export default function() {
  const bottle = new Bottle();

  bottle.factory('entryController', bootstrapEntryController);
  bottle.factory('entryService', bootstrapEntryService);
  bottle.factory('graphqlSchema', bootstrapGraphqlSchema);
  bottle.factory('logger', bootstrapLogger);
  bottle.factory('loginController', bootstrapLoginController);
  bottle.factory('server', bootstrapServer);
  bottle.factory('store', bootstrapStore);
  bottle.factory('userService', bootstrapUserService);

  return bottle.container;
}
