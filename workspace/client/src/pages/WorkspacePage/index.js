import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import AuthenticatedPageLayout from 'layouts/AuthenticatedPageLayout';
import { PrimaryButton } from 'uikit/Button';
import Link from 'components/Link';
import EntryEditor from 'components/EntryEditor';
import { fragments as EntryEditorFragments } from 'components/EntryEditor/EntryEditorConnector';

import withConnectors from 'state/withConnectors';

export const query = gql`query workspacePageQuery($since: String!) {
    entries(since: $since) {
      id
      text
      ...EntryEditor_entry
    }
  }
  ${EntryEditorFragments.entry}
`;

const Container = styled.section`
  display: grid;
  grid-template-columns: 15% 85%;
  height: 100%;
  grid-template-areas: "nav main";

  @media (max-width: 768px) {
    grid-template-columns: 100%;
    grid-template-areas:
      "main"
      "nav"
  }
`;

const Nav = styled.nav`
  flex: 1;
  grid-area: nav;
  overflow: scroll;
  background: ${props => props.theme.colors.grayLight};

  @media (max-width: 768px) {
    height: auto;
    overflow: visible;
  }
`;

const Main = styled.section`
  flex: 2;
  grid-area: main;
  padding: ${props => props.theme.spacingMedium};
`;

const NavLink = styled(Link)`
  align-items: center;
  color: ${props => props.theme.fontColorDark};
  display: block;
  min-height: 30px;
  background: ${props => (props.isActive ? props.theme.white : props.theme.backgroundDark)};
  display: flex;
  border-bottom: 1px solid ${props => props.theme.borderDark};
  border-right: 1px solid ${props => props.theme.borderDark};
  font-size: ${props => props.theme.fontSizeMedium};
  padding: ${props => props.theme.spacingSmall} ${props => props.theme.spacingMedium};

  &:hover {
    text-decoration: none;
    background: ${props => props.theme.backgroundLightest};
  }
`;

const NewButtonContainer = styled.div`
  align-items: center;
  min-height: 30px;
  background: ${props => (props.isActive ? props.theme.white : props.theme.backgroundDark)};
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${props => props.theme.borderDark};
  border-right: 1px solid ${props => props.theme.borderDark};
`;

const EntryPreview = ({ entryPreview, connectors, isActive }) => (
  <connectors.LinkConnector>
    {({ handleClick }) => (
      <NavLink onClick={handleClick} isActive={isActive} href={`/workspace/${entryPreview.id}`}>{entryPreview.text}</NavLink>
    )}
  </connectors.LinkConnector>
);

const NewButton = styled(PrimaryButton)`
  width: 90%;
`;

EntryPreview.propTypes = {
  entryPreview: PropTypes.object,
  connectors: PropTypes.object,
  isActive: PropTypes.bool,
};

const EntryPreviewList = ({ connectors }) => (
  <connectors.EntriesConnector>
    {({ entryPreviews, handleClickCreate, selectedIntryId }) => (
      <Nav>
        <NewButtonContainer><NewButton onClick={handleClickCreate}>new</NewButton></NewButtonContainer>
        {entryPreviews.map(entryPreview => <EntryPreview key={entryPreview.id} isActive={entryPreview && entryPreview.id === selectedIntryId} entryPreview={entryPreview} connectors={connectors} />)}
      </Nav>
    )}
  </connectors.EntriesConnector>
);

EntryPreviewList.propTypes = {
  connectors: PropTypes.object,
};

export const WorkspacePage = ({ connectors }) => {
  return (
    <connectors.AuthenticatedPageLayoutConnector>
      {({ user, selectedEntryId }) => (
        <AuthenticatedPageLayout user={user}>
          <Container role="main">
            <EntryPreviewList connectors={connectors} />
            <Main>
              {selectedEntryId ? <EntryEditor /> : null}
            </Main>
          </Container>
        </AuthenticatedPageLayout>
      )}
    </connectors.AuthenticatedPageLayoutConnector>
  );
};

WorkspacePage.propTypes = {
  connectors: PropTypes.object,
};

export default withConnectors()(WorkspacePage);
