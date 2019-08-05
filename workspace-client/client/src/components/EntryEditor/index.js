import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import EntryForm from 'components/EntryForm';
import EntryDeleteContainer from 'components/EntryDeleteContainer';
import withConnectors from 'state/withConnectors';

const MetaContainer = styled.div`
  color: ${props => props.theme.fontColorLightest};
  display: flex;
  justify-content: space-between;
  margin: ${props => props.theme.spacingMedium} ${props => props.theme.spacingMedium};
`;

const SaveContainer = styled.span`
  align-items: center;
  display: flex;

  &::before {
    border-radius: 50%;
    content: '';
    display: inline-block;
    height: 10px;
    margin-right: 3px;
    width: 10px;
  }
`;

const SavedContainer = styled(SaveContainer)`
  &::before {
    background-color: ${props => props.theme.colorSuccess};
  }
`;

const SavingContainer = styled(SaveContainer)`
&::before {
  background-color: ${props => props.theme.colorWarning};
}
`;

export const EntryEditor = ({ connectors }) => {
  return (
    <connectors.EntryEditorConnector>
      {({ entry, isSaving, selectedEntryId }) => {
        // TODO: This is kinda dumb. Consider rendering a different page in this case.
        if (!entry && !selectedEntryId) {
          return <div>{'<---'} Create a new one</div>;
        }

        if (!entry && !!selectedEntryId) {
          return <div>Loading...</div>;
        }

        return (
          <div>
            <EntryForm entryId={entry.id} toolbar={<EntryDeleteContainer entryId={entry.id} />} />
            <MetaContainer>
              <div>
                <span>Created at {entry.timeCreated}</span>
                {entry.timeUpdated ? <span> • {entry.timeUpdated}</span> : null}
              </div>
              {isSaving ? <SavingContainer>saving...</SavingContainer> : <SavedContainer>saved</SavedContainer>}
            </MetaContainer>
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
