import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BaseBageLayout from 'layouts/BaseBageLayout';

export default class BasePageLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <BaseBageLayout>
        {this.props.children}
      </BaseBageLayout>
    );
  }
}
