import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import actions from 'state/actions';
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
  onSubmit: (values, dispatch) => {
    dispatch(actions.entryFormSubmitted(values));
  },
})(Connector);

export default connect(mapStateToProps)(form);
