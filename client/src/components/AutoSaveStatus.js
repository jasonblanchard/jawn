import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import connectToAppProvider from 'src/state/connectToAppProvider';

import css from './AutoSaveStatus.scss';

export default class AutoSaveStatus extends Component {
  static propTypes = {
    didFail: PropTypes.bool,
    isSaving: PropTypes.bool,
    timeCreated: PropTypes.string,
    timeUpdated: PropTypes.string,
  }

  render() {
    const { isSaving, didFail, timeCreated, timeUpdated } = this.props;

    return (
      <div className={css.container}>
        <span>
          {moment(timeCreated).format('MMMM Do YYYY, h:mm a')}
          {timeUpdated ? ` • ${moment(timeUpdated).format('MMMM Do YYYY, h:mm a')}` : null}
        </span>
        <span className={classNames(css.saveStatus, { isSaving, didFail })}>
          {this.getText()}
        </span>
      </div>
    );
  }

  getText() {
    const { isSaving, didFail } = this.props;
    if (didFail) return 'error saving';
    if (isSaving) return 'saving...';
    return 'saved';
  }
}

function mapStateToProps(state) {
  return {
    didFail: Boolean(state.updatingEntryFailedId),
    isSaving: Boolean(state.isUpdatingEntryId || state.debouncedUpdatingEntryId),
  };
}

export const AutoSaveStatusContainer = connectToAppProvider(mapStateToProps)(AutoSaveStatus);
