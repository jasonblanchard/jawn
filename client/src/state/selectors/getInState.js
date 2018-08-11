import getIn from 'lodash.get';

export default function(state, path, defaultValue) {
  return getIn(state, path, defaultValue);
}
