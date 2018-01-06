import classNames from 'classnames';
import gql from 'graphql-tag';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import css from './Entry.scss';

export default class Entry extends Component {
  static propTypes = {
    className: PropTypes.string,
    entry: PropTypes.object.isRequired,
  }

  static fragments = {
    entry: gql`
      fragment EntryComponent on Entry {
        id
        text
        timeCreated
        timeUpdated
      }
    `,
  }

  render() {
    const className = classNames(css.container, this.props.className);
    return (
      <div className={className}>
        <div className={css.meta}>
          <div className={css.date}>
            {moment(this.props.entry.timeCreated).format('MMMM Do YYYY, h:mm a')}
            {this.props.entry.timeUpdated ? ` • updated ${moment(this.props.entry.timeUpdated).format('MMMM Do YYYY, h:mm a')}` : null}
          </div>
        </div>
        <p> {this.props.entry.text}</p>
      </div>
    );
  }
}
