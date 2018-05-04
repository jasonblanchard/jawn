import classNames from 'classnames';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TextBlock } from 'react-placeholder/lib/placeholders';

import css from './Entry.scss';

export default class Entry extends Component {
  static propTypes = {
    className: PropTypes.string,
    entry: PropTypes.object.isRequired,
    isMasked: PropTypes.bool,
  }

  static fragments = {
    entry: gql`
      fragment EntryComponent_entry on Entry {
        id
        text
        timeCreated
        timeUpdated
      }
    `,
  }

  render() {
    const className = classNames(css.container, this.props.className);
    const { isMasked, entry } = this.props;
    return (
      <div className={className}>
        {isMasked ? <TextBlock color="#E0E0E0" rows={Math.ceil(entry.text.length / 120)} /> : <p>{entry.text}</p>}
      </div>
    );
  }
}
