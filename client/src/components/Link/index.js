import PropTypes from 'prop-types';
import React, { Component } from 'react';

const isModifiedEvent = event => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export default class Link extends Component {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    href: PropTypes.string.isRequired,
    target: PropTypes.string,
  }

  static defaultProps = {
    onClick: () => {},
  }

  render() {
    const { onClick, href, children, ...rest } = this.props;
    return (
      <a href={href} {...rest} onClick={this.handleClick}>{children}</a>
    );
  }

  handleClick = event => {
    if (
      event.button === 0 && // ignore everything but left clicks
      !this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();
      this.props.onClick(this.props.href);
    }
  }
}
