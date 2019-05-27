import { connect } from 'react-redux';

import actions from 'state/actions';
import Connector from 'state/Connector';
import selectors from 'state/selectors';

function mapStateToProps(state) {
  return {
    entryPreviews: selectors.getEntryPreviews(state),
    selectedIntryId: selectors.getSelectedEntryId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleClickCreate: () => dispatch(actions.createEntry()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Connector);
