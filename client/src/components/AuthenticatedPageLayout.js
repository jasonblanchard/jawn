import { Link } from 'react-router-dom';
import classNames from 'classnames';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { Children, Component } from 'react';

import css from './AuthenticatedPageLayout.scss';

export default class AuthenticatedPageLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    loading: PropTypes.bool,
    user: PropTypes.object,
  }

  static fragments = {
    user: gql`
      fragment AuthenticatedPageLayout on User {
        username
      }
    `,
  }

  render() {
    const children = Children.toArray(this.props.children);
    const [firstChild, ...restChildren] = children;
    return (
      <div className={classNames(this.props.className)}>
        <header className={css.header}>
          <h1><Link to="/">top navbar</Link></h1>
          {restChildren.length > 0 ? firstChild : null}
          <nav>
            {this.props.loading || !this.props.user ? <span>loading...</span> : <Link to="/settings">{this.props.user.username}</Link>}
          </nav>
        </header>
        <div className={css.content}>
          {restChildren.length > 0 ? restChildren : children}
        </div>
      </div>
    );
  }
}
