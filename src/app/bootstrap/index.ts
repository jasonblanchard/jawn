import Bottle, { IContainer } from 'bottlejs';
import { Registry as RegistryInterface } from './registry';

import bootstrapGraphqlService from './bootstrapGraphqlService';
import bootstrapLogger from './bootstrapLogger';
import bootstrapLoginController from './bootstrapLoginController';
import bootstrapServer from './bootstrapServer';
import bootstrapStore from './bootstrapStore';
import bootstrapUserService from './bootstrapUserService';

class Registry implements RegistryInterface, IContainer {
  private container: IContainer
  $decorator: any // Not using these, just there to make the type checker happy.
  $register: any
  $list: any
  
  constructor(container: IContainer) {
    this.container = container;
    this.$decorator = container.$decorator;
    this.$register = container.$register;
    this.$list = container.$list; 
  }

  get graphqlService() {
    return this.container.graphqlService;
  }

  get logger() {
    return this.container.logger;
  }

  get loginController() {
    return this.container.loginController;
  }

  get server() {
    return this.container.server;
  }

  get store() {
    return this.container.store;
  }

  get userService() {
    return this.container.userService;
  }
}

export default function(): Registry {
  const bottle = new Bottle();

  bottle.factory('graphqlService', (registry: Registry) => bootstrapGraphqlService(registry));
  bottle.factory('logger', bootstrapLogger);
  bottle.factory('loginController', (registry: Registry) => bootstrapLoginController(registry));
  bottle.factory('server', (registry: Registry) => bootstrapServer(registry));
  bottle.factory('store', bootstrapStore);
  bottle.factory('userService', (registry: Registry) => bootstrapUserService(registry));

  return new Registry(bottle.container);
}
