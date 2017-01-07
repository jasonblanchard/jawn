import Bottle from 'bottlejs';

import bootstrapLogger from './bootstrapLogger';
import bootstrapStore from './bootstrapStore';

export default function() {
  const bottle = new Bottle();

  bottle.factory('logger', bootstrapLogger);
  bottle.factory('store', bootstrapStore);

  return bottle.container;
}
