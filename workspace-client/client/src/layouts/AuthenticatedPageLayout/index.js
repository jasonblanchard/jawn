import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
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
  min-height: 30px;
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
  font-weight: 400;
`;

const HeaderLink = styled(Link)`
  color: ${props => props.theme.textLightest};
`;

export default class BasePageLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
    user: PropTypes.object,
  }

  static defaultProps = {
    user: {},
  }

  render() {
    const { user } = this.props;

    return (
      <Fragment>
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
                {user.username ? <HeaderLink onClick={handleClick} href="/settings">{user.username}</HeaderLink> : null}
              </nav>
            )}
          </LinkConnector>
        </Header>
        {this.props.children}
      </Fragment>
    );
  }
}
