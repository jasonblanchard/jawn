import { connect } from 'react-redux';

import Connector from 'state/connector';

function mapDispatchToProps(dispatch) {
  return {
    handleClick: path => dispatch({ type: 'CHANGE_LOCATION', path }),
  };
}

export default connect(() => ({}), mapDispatchToProps)(Connector);
