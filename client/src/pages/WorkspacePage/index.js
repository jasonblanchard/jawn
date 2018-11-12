import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import AuthenticatedPageLayout from 'layouts/AuthenticatedPageLayout';
import { fragments as AuthenticatedPageLayoutFragments } from 'layouts/AuthenticatedPageLayout/connector';
import Link from 'components/Link';

import withConnectors from 'state/withConnectors';


export const query = gql`query workspacePageQuery($userId: ID!, $since: String!) {
    entries(since: $since) {
      id
      text
    }
    user(id: $userId) {
      id
      ...AuthenticatedPageLayout_user
    }
  }
  ${AuthenticatedPageLayoutFragments.user}
`;

const Container = styled.section`
  display: flex;
`;

const Nav = styled.nav`
  flex: 1;
`;

const Main = styled.section`
  flex: 2;
`;

const NavLink = styled(Link)`
  display: block;
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

export const WorkspacePage = ({ connectors }) => (
  <connectors.AuthenticatedPageLayoutConnector>
    {({ user }) => (
      <AuthenticatedPageLayout user={user}>
        <Container>
          <EntryPreviewList connectors={connectors} />
          <Main>
            MAIN CONTENT AREA
          </Main>
        </Container>
      </AuthenticatedPageLayout>
    )}
  </connectors.AuthenticatedPageLayoutConnector>
);

WorkspacePage.propTypes = {
  connectors: PropTypes.object,
};

export default withConnectors()(WorkspacePage);
