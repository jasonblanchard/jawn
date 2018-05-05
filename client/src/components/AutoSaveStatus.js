import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import connectToAppProvider from 'src/state/connectToAppProvider';

import css from './AutoSaveStatus.scss';

export default class AutoSaveStatus extends Component {
  static propTypes = {
    isSaving: PropTypes.bool,
  }

  render() {
    const { isSaving } = this.props;

    return (
      <div className={classNames(css.container, { isSaving })}>
        {isSaving ? 'saving...' : 'saved'}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSaving: Boolean(state.isUpdatingEntryId || state.debouncedUpdatingEntryId),
  };
}

export const AutoSaveStatusContainer = connectToAppProvider(mapStateToProps)(AutoSaveStatus);
