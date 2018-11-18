import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import AuthenticatedPageLayout from 'layouts/AuthenticatedPageLayout';
import { fragments as AuthenticatedPageLayoutFragments } from 'layouts/AuthenticatedPageLayout/connector';
import Link from 'components/Link';
import EntryEditor from 'components/EntryEditor';
import { fragments as EntryEditorFragments } from 'components/EntryEditor/EntryEditorConnector';

import withConnectors from 'state/withConnectors';

export const query = gql`query workspacePageQuery($userId: ID!, $since: String!) {
    entries(since: $since) {
      id
      text
      ...EntryEditor_entry
    }
    user(id: $userId) {
      id
      ...AuthenticatedPageLayout_user
    }
  }
  ${AuthenticatedPageLayoutFragments.user}
  ${EntryEditorFragments.entry}
`;

const Container = styled.section`
  display: grid;
  grid-template-columns: 15% 85%;
  height: 100vh;
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
  background: ${props => props.theme.backgroundDark};
  display: flex;
  border-bottom: 1px solid ${props => props.theme.borderDark};
  border-right: 1px solid ${props => props.theme.borderDark};
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSizeMedium};
  padding: ${props => props.theme.spacingSmall} ${props => props.theme.spacingMedium};

  &:hover {
    text-decoration: none;
    background: ${props => props.theme.backgroundLightest};
  }

  &:last-child {
    border: 0;
  }
`;

const EntryPreview = ({ entryPreview, connectors }) => (
  <connectors.LinkConnector>
    {({ handleClick }) => (
      <NavLink onClick={handleClick} href={`/workspace/${entryPreview.id}`}>{entryPreview.text}</NavLink>
    )}
  </connectors.LinkConnector>
);

EntryPreview.propTypes = {
  entryPreview: PropTypes.object,
  connectors: PropTypes.object,
};

const EntryPreviewList = ({ connectors }) => (
  <connectors.EntriesConnector>
    {({ entryPreviews }) => (
      <Nav>
        {entryPreviews.map(entryPreview => <EntryPreview key={entryPreview.id} entryPreview={entryPreview} connectors={connectors} />)}
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
      {({ user }) => (
        <AuthenticatedPageLayout user={user}>
          <Container>
            <EntryPreviewList connectors={connectors} />
            <Main>
              <EntryEditor />
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
