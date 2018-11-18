import PropTypes from 'prop-types';
import React from 'react';

import withConnectors from 'state/withConnectors';

const EntryDeleteContainer = ({ connectors, entryId }) => {
  return (
    <connectors.EntryDeleteContainerConnector entryId={entryId}>
      {({ didRequestDelete, handleRequestDelete, handleCancelRequestDelete, handleClickDelete, isConfirmButtonDisabled }) => {
        if (didRequestDelete) {
          return (
            <div>
              Are you sure? <button type="button" onClick={handleClickDelete} disabled={isConfirmButtonDisabled}>yup</button> <button type="button" onClick={handleCancelRequestDelete}>nope</button>
            </div>
          );
        }
        return (
          <button type="button" onClick={handleRequestDelete}>delete</button>
        );
      }}
    </connectors.EntryDeleteContainerConnector>
  );
};

EntryDeleteContainer.propTypes = {
  entryId: PropTypes.string,
  connectors: PropTypes.object,
};

export default withConnectors()(EntryDeleteContainer);
