import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { PrimaryButton } from 'uikit/Button';
import withConnectors from 'state/withConnectors';

const StyledTextarea = styled.textarea`
  border: 0;
  color: ${props => props.theme.fontColorDark};
  font-size: ${props => props.theme.fontSizeMedium};
  height: 80vh;
  width: 100%;
  padding: ${props => props.theme.spacingMedium};
  transition: box-shadow .1s ease-in-out;
  box-sizing: border-box;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 ${props => props.theme.borderThin} ${props => props.theme.colorAccent}
  }
`;

const Textarea = field => (
  <StyledTextarea {...field.input} />
);

const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EntryForm = ({ connectors, entryId, toolbar }) => {
  return (
    <connectors.EntryFormConnector entryId={entryId}>
      {({ handleSubmit, pristine, submitting, handleChangeText }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field onChange={handleChangeText} id="text" label="text" name="text" component={Textarea} />
            <ToolbarContainer>
              <PrimaryButton disabled={pristine || submitting}>save</PrimaryButton>
              {toolbar}
            </ToolbarContainer>
          </form>
        );
      }}
    </connectors.EntryFormConnector>
  );
};

EntryForm.propTypes = {
  connectors: PropTypes.object,
  entryId: PropTypes.string,
  toolbar: PropTypes.node,
};

export default withConnectors()(EntryForm);
