import { getModel } from 'redux-loop';
import getIn from 'lodash.get';

export default function(state, path, defaultValue) {
  // TODO: is getModel necessary?
  return getIn(getModel(state), path, defaultValue);
}
