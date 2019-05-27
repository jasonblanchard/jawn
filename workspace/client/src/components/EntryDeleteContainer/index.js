import PropTypes from 'prop-types';
import React from 'react';

import withConnectors from 'state/withConnectors';
import { PrimaryButton, MinimalButton, DangerButton } from 'uikit/Button';

const EntryDeleteContainer = ({ connectors, entryId }) => {
  return (
    <connectors.EntryDeleteContainerConnector entryId={entryId}>
      {({ didRequestDelete, handleRequestDelete, handleCancelRequestDelete, handleClickDelete, isConfirmButtonDisabled }) => {
        if (didRequestDelete) {
          return (
            <div>
              Are you sure? <DangerButton type="button" onClick={handleClickDelete} disabled={isConfirmButtonDisabled}>yup</DangerButton> <PrimaryButton type="button" onClick={handleCancelRequestDelete}>nope</PrimaryButton>
            </div>
          );
        }
        return (
          <MinimalButton type="button" onClick={handleRequestDelete}>delete</MinimalButton>
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
