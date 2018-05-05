import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import connectToAppProvider from 'src/state/connectToAppProvider';

import css from './AutoSaveStatus.scss';

export default class AutoSaveStatus extends Component {
  static propTypes = {
    didFail: PropTypes.bool,
    isSaving: PropTypes.bool,
  }

  render() {
    const { isSaving, didFail } = this.props;

    return (
      <div className={classNames(css.container, { isSaving, didFail })}>
        {this.getText()}
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
