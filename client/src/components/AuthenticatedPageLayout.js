import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import css from './AuthenticatedPageLayout.scss';

export default class AuthenticatedPageLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  render() {
    return (
      <div className={classNames(this.props.className)}>
        <header className={css.header}>
          <h1><Link to="/">top navbar</Link></h1>
          <nav>
            <Link to="/settings">settings</Link>
          </nav>
        </header>
        {this.props.children}
      </div>
    );
  }
}
