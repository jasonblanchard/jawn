import Bottle from 'bottlejs';

export default function bootstrap() {
  const bottle = new Bottle();

  bottle.factory('history', require('./bootstrapHistory').default);
  bottle.factory('store', require('./bootstrapStore').default);

  return bottle.container;
}
