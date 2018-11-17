import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import withConnectors from 'state/withConnectors';

const EntryForm = ({ connectors }) => {
  return (
    <connectors.EntryFormConnector>
      {() => {
        return (
          <form>
            <Field id="text" label="text" name="text" component="textarea" />
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
