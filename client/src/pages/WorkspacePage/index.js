import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';

import AuthenticatedPageLayout from 'layouts/AuthenticatedPageLayout';
import AuthenticatedPageLayoutConnector, { fragments as AuthenticatedPageLayoutFragments } from 'layouts/AuthenticatedPageLayout/connector';
import Link from 'components/Link';
import LinkConnector from 'components/Link/LinkConnector';

import EntriesConnector from './EntriesConnector';

export const query = gql`query workspacePageQuery($userId: ID!, $since: String!) {
    entries(since: $since) {
      id
      text
      timeCreated
      timeUpdated
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

const EntryPreview = entryPreview => (
  <LinkConnector>
    {({ handleClick }) => (
      <NavLink key={entryPreview.id} onClick={handleClick} href={`/workspace/${entryPreview.id}`}>{entryPreview.text}</NavLink>
    )}
  </LinkConnector>
);

const EntryPreviewList = () => (
  <EntriesConnector>
    {({ entryPreviews }) => (
      <Nav>
        {entryPreviews.map(EntryPreview)}
      </Nav>
    )}
  </EntriesConnector>
);

const WorkspacePage = () => (
  <AuthenticatedPageLayoutConnector>
    {({ user }) => (
      <AuthenticatedPageLayout user={user}>
        <Container>
          <EntryPreviewList />
          <Main>
            MAIN CONTENT AREA
          </Main>
        </Container>
      </AuthenticatedPageLayout>
    )}
  </AuthenticatedPageLayoutConnector>
);

export default WorkspacePage;
