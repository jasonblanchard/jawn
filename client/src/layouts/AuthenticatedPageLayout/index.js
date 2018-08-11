import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Link from 'components/Link';
import LinkConnector from 'components/Link/LinkConnector';

export default class BasePageLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div>
        <header>
          <h1>Jawn</h1>
          <LinkConnector>
            {({ handleClick }) => (
              <nav>
                <Link onClick={handleClick} href="/workspace">Workspace</Link> | <Link onClick={handleClick} href="/about">About</Link>
              </nav>
            )}
          </LinkConnector>
        </header>
        {this.props.children}
      </div>
    );
  }
}
