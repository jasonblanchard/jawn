import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

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

const EntryForm = ({ connectors, entryId }) => {
  return (
    <connectors.EntryFormConnector entryId={entryId}>
      {({ handleSubmit, pristine, submitting, handleChangeText }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field onChange={handleChangeText} id="text" label="text" name="text" component={Textarea} />
            <button disabled={pristine || submitting}>save</button>
          </form>
        );
      }}
    </connectors.EntryFormConnector>
  );
};

EntryForm.propTypes = {
  connectors: PropTypes.object,
  entryId: PropTypes.string,
};

export default withConnectors()(EntryForm);
