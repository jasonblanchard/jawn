import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import withConnectors from 'state/withConnectors';

const EntryForm = ({ connectors }) => {
  return (
    <connectors.EntryFormConnector>
      {({ handleSubmit, pristine, submitting, handleChangeText }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field onChange={handleChangeText} id="text" label="text" name="text" component="textarea" />
            <button disabled={pristine || submitting}>save</button>
          </form>
        );
      }}
    </connectors.EntryFormConnector>
  );
};

EntryForm.propTypes = {
  connectors: PropTypes.object,
};

export default withConnectors()(EntryForm);
