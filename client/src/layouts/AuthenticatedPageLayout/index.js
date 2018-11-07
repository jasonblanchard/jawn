import PropTypes from 'prop-types';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Link from 'components/Link';
import LinkConnector from 'components/Link/LinkConnector';

const Header = styled.header`
  align-items: center;
  background: ${props => props.theme.backgroundDarkest};
  box-sizing: border-box;
  color: ${props => props.theme.textLightest};
  display: flex;
  font-family: ${props => props.theme.fontFamilyBrand};
  height: 30px;
  justify-content: space-between;
  letter-spacing: ${props => props.theme.letterSpacingBrand};
  padding: 5px;
  width: 100%;
  z-index: 1;
`;

const Heading = styled.h1`
  font-family: ${props => props.theme.fontFamilyBrandHeading};
  font-size: ${props => props.theme.fontSizeLarge};
  text-transform: uppercase;
`;

const HeaderLink = styled(Link)`
  color: ${props => props.theme.textLightest};
  font-size: ${props => props.theme.fontSizeMedium};
`;

export default class BasePageLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static fragments = {
    user: gql`
      fragment AuthenticatedPageLayout_user on User {
        username
      }
    `,
  }

  render() {
    return (
      <div>
        <Header>
          <Heading>
            <LinkConnector>
              {({ handleClick }) => (
                <Link onClick={handleClick} href="/workspace">Jawn</Link>
              )}
            </LinkConnector>
          </Heading>
          <LinkConnector>
            {({ handleClick }) => (
              <nav>
                <HeaderLink onClick={handleClick} href="/about">About</HeaderLink> | <HeaderLink onClick={handleClick} href="/login">Login</HeaderLink>
              </nav>
            )}
          </LinkConnector>
        </Header>
        {this.props.children}
      </div>
    );
  }
}
