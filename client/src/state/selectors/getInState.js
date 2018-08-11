import { getModel } from 'redux-loop';
import getIn from 'lodash.get';

export default function(state, path, defaultValue) {
  return getIn(getModel(state), path, defaultValue);
}
