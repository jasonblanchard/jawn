import { connect } from 'react-redux';
import Connector from 'state/Connector';
import selectors from 'state/selectors';

function mapStateToProps(state) {
  return {
    entries: selectors.getEntries(state),
  };
}

export default connect(mapStateToProps)(Connector);
