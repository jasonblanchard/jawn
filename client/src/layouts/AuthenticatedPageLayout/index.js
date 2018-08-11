import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Link from 'components/Link';

export default class BasePageLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div>
        <header>
          <h1>Jawn</h1>
          <nav>
            <Link href="/workspace">Workspace</Link> | <Link href="/about">About</Link>
          </nav>
        </header>
        {this.props.children}
      </div>
    );
  }
}
