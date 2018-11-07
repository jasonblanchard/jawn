import { connect } from 'react-redux';
import Connector from 'state/Connector';
import selectors from 'state/selectors';

function mapStateToProps(state) {
  return {
    user: selectors.getAuthenticatedUser(state),
  };
}

export default connect(mapStateToProps)(Connector);
