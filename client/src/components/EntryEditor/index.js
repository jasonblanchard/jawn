import PropTypes from 'prop-types';
import React from 'react';

import EntryForm from 'components/EntryForm';
import withConnectors from 'state/withConnectors';

export const EntryEditor = ({ connectors }) => {
  return (
    <connectors.EntryEditorConnector>
      {({ entry, isSaving }) => {
        if (!entry) {
          return <div>loading...</div>;
        }

        return (
          <div>
            <div>Created at {entry.timeCreated}</div>
            <div>{isSaving ? 'saving...' : 'saved'}</div>
            <EntryForm />
          </div>
        );
    }}
    </connectors.EntryEditorConnector>
  );
};

EntryEditor.propTypes = {
  connectors: PropTypes.object,
};

export default withConnectors()(EntryEditor);
