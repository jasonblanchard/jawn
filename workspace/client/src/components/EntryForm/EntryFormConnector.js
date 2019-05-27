import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { frame } from 'redux-frame';

import actions from 'state/actions';
import Connector from 'state/Connector';
import selectors from 'state/selectors';

function mapStateToProps(state) {
  return {
    initialValues: selectors.getEntryFormInitialValues(state),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleChangeText: (event, text) => {
      dispatch({
        type: frame('ENTRY_FORM_CHANGED'),
        values: { text },
        id: ownProps.entryId,
        interceptors: [
          ['effect', { effectId: 'debug' }],
          ['effect', { effectId: 'dispatch' }],
          ['effect', { effectId: 'debouncedUpdateEntry' }],
        ],
      });
    },
  };
}

const form = reduxForm({
  form: 'entry',
  onSubmit: (values, dispatch, props) => {
    dispatch(actions.entryFormSubmitted(props.entryId, values));
  },
})(Connector);

export default connect(mapStateToProps, mapDispatchToProps)(form);
