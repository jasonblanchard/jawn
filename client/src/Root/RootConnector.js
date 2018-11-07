import { connect } from 'react-redux';
import Connector from 'state/Connector';
import getInState from 'state/selectors/getInState';

function mapStateToProps(state) {
  return {
    routeId: getInState(state, 'routeId'),
  };
}

export default connect(mapStateToProps)(Connector);