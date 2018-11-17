import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Connector from 'state/Connector';
import selectors from 'state/selectors';

function mapStateToProps(state) {
  return {
    initialValues: selectors.getEntryFormInitialValues(state),
  };
}

const form = reduxForm({
  form: 'entry',
  enableReinitialize: true,
  onChange: (state, dispatch) => {
    dispatch({ type: 'ENTRY_FORM_CHANGED' });
  },
})(Connector);

export default connect(mapStateToProps)(form);
