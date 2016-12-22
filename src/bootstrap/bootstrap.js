import Bottle from 'bottlejs';

import bootstrapApp from './bootstrapApp';
import bootstrapEntryController from './bootstrapEntryController';
import bootstrapEntryService from './bootstrapEntryService';
import bootstrapLogger from './bootstrapLogger';
import bootstrapStore from './bootstrapStore';

export default function() {
  const bottle = new Bottle();

  bottle.factory('app', bootstrapApp);
  bottle.factory('entryController', bootstrapEntryController);
  bottle.factory('entryService', bootstrapEntryService);
  bottle.factory('logger', bootstrapLogger);
  bottle.factory('store', bootstrapStore);

  return bottle.container;
}
