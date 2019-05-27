import pathToRegexp from 'path-to-regexp';
import zip from 'lodash.zipobject';

export function matches(path, route) {
  const re = pathToRegexp(path);
  const result = re.exec(route);
  return !!result;
}

export function params(path, route) {
  const keys = [];
  const re = pathToRegexp(path, keys);
  // FIXME: ignoreRestSiblings linter rule
  const [_, ...values] = re.exec(route); // eslint-disable-line no-unused-vars
  const paramKeys = keys.map(key => key.name);
  return zip(paramKeys, values);
}

export default {
  params,
  matches,
};
