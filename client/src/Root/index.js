import PropTypes from 'prop-types';
import React, { Component } from 'react';
import routes from 'config/routes';

export default class Root extends Component {
  static propTypes = {
    routeId: PropTypes.string,
  }

  render() {
    const route = routes[this.props.routeId];
    return route ? route.render() : <div>404: Route not Found</div>;
  }
}
