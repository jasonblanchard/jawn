import PropTypes from 'prop-types';
import { Component } from 'react';

export default class Connector extends Component {
  static propTypes = {
    children: PropTypes.func,
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      children(rest)
    );
  }
}
