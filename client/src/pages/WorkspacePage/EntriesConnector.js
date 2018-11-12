import { connect } from 'react-redux';
import Connector from 'state/Connector';
import selectors from 'state/selectors';

function mapStateToProps(state) {
  return {
    entryPreviews: selectors.getEntryPreviews(state),
  };
}

export default connect(mapStateToProps)(Connector);
