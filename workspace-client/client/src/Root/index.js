import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import GlobalStyle from 'styles/GlobalStyle';

import routes from 'config/routes';

import 'styles/reset.css';

export default class Root extends Component {
  static propTypes = {
    routeId: PropTypes.string,
  }

  // TODO: Figure out FOUC issue.
  render() {
    const route = routes[this.props.routeId];
    return (
      <Fragment>
        <GlobalStyle />
        {route ? route.render() : <div>404: Route not Found</div>}
      </Fragment>
    );
  }
}
