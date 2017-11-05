import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import cssClassNames from './Entry.scss';

export default class Entry extends Component {
  static propTypes = {
    className: PropTypes.className,
    entry: PropTypes.object.isRequired,
  }

  render() {
    const className = classNames(cssClassNames.container, this.props.className);
    return (
      <div className={className}>
        <div className={cssClassNames.meta}>
          <div className={cssClassNames.date}>
            {moment(this.props.entry.timeCreated).format('MMMM Do YYYY, h:mm a')}
            {this.props.entry.timeUpdated ? ` • updated ${moment(this.props.entry.timeUpdated).format('MMMM Do YYYY, h:mm a')}` : null}
          </div>
        </div>
        <p> {this.props.entry.text}</p>
      </div>
    );
  }
}
