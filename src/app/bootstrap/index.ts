import Bottle from 'bottlejs';
import { Registry } from './registry';

import bootstrapGraphqlService from './bootstrapGraphqlService';
import bootstrapLogger from './bootstrapLogger';
import bootstrapLoginController from './bootstrapLoginController';
import bootstrapServer from './bootstrapServer';
import bootstrapStore from './bootstrapStore';
import bootstrapUserService from './bootstrapUserService';

export default function(): Registry {
  const bottle = new Bottle();

  bottle.factory('graphqlService', bootstrapGraphqlService);
  bottle.factory('logger', bootstrapLogger);
  bottle.factory('loginController', bootstrapLoginController);
  bottle.factory('server', bootstrapServer);
  bottle.factory('store', bootstrapStore);
  bottle.factory('userService', bootstrapUserService);

  // TODO: Figure out a better way to do this, this is kind of dumb.
  return <Registry>bottle.container;
}
