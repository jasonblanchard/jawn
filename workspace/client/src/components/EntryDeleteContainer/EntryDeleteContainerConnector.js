import { connect } from 'react-redux';

import actions from 'state/actions';
import Connector from 'state/Connector';
import selectors from 'state/selectors';

function mapStateToProps(state) {
  return {
    didRequestDelete: selectors.didRequestDelete(state),
    isConfirmButtonDisabled: selectors.isDeletingSelectedEntry(state),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleRequestDelete: () => dispatch({ type: 'REQUEST_DELETE_ENTRY' }),
    handleCancelRequestDelete: () => dispatch({ type: 'CANCEL_REQUEST_DELETE_ENTRY' }),
    handleClickDelete: () => dispatch(actions.deleteEntry(ownProps.entryId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Connector);
