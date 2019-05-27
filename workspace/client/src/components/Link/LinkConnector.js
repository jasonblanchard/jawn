import { connect } from 'react-redux';
import { frame } from 'redux-frame';

import Connector from 'state/Connector';

function mapDispatchToProps(dispatch) {
  return {
    handleClick: path => dispatch({
      type: frame('CHANGE_LOCATION'),
      interceptors: [
        ['effect', { effectId: 'debug' }],
        ['effect', { effectId: 'dispatch' }],
        ['injectCoeffects', { coeffectId: 'registry' }],
        ['effect', { effectId: 'changeLocation', args: { path } }],
      ],
      path,
    }),
  };
}

export default connect(() => ({}), mapDispatchToProps)(Connector);
