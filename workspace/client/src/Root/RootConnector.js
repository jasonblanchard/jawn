import { connect } from 'react-redux';
import Connector from 'state/Connector';

import selectors from 'state/selectors';

function mapStateToProps(state) {
  return {
    routeId: selectors.getRouteId(state),
  };
}

export default connect(mapStateToProps)(Connector);
