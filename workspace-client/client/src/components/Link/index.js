import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

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
      <Anchor href={href} {...rest} onClick={this.handleClick}>{children}</Anchor>
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
