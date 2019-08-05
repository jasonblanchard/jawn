import Bottle, { IContainer } from 'bottlejs';
import { Registry as RegistryInterface } from './registry';

import bootstrapLogger from './bootstrapLogger';
import bootstrapServer from './bootstrapServer';

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

  get logger() {
    return this.container.logger;
  }

  get server() {
    return this.container.server;
  }
}

export default function() {
  const bottle = new Bottle();

  bottle.factory('logger', bootstrapLogger);
  bottle.factory('server', (registry: Registry) => bootstrapServer(registry));

  return new Registry(bottle.container);
}
