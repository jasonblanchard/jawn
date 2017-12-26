import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class AuthenticatedPageLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  render() {
    return (
      <div className={classNames(this.props.className)}>
        <nav>
          <h1>top navbar</h1>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
