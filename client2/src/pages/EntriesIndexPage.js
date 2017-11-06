import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import connectToAppProvider from 'src/state/connectToAppProvider';
import EditableEntry from 'src/components/EditableEntry';

import css from './EntriesIndexPage.scss';

export default class EntriesIndexPage extends Component {
  static propTypes = {
    entries: PropTypes.array,
  }

  static defaultProps = {
    entries: [],
  }

  render() {
    return (
      <div className={css.container}>
        {this.getEntries().map(entry => (
          <EditableEntry key={entry.id} entry={entry} />
        ))}
      </div>
    );
  }

  getEntries() {
    return this.props.entries.sort((entry1, entry2) => (moment(entry1.timeCreated).isBefore(entry2.timeCreated) ? 1 : -1));
  }
}

class EntiresIndexPageRenderer extends Component {
  static propTypes = {
    fetchEntries: PropTypes.func.isRequired,
    entries: PropTypes.array,
  }

  static defaultProps = {
    entries: undefined,
  }

  componentDidMount() {
    this.props.fetchEntries();
  }

  render() {
    return this.props.entries ? <EntriesIndexPage {...this.props} /> : <div>Loading...</div>;
  }
}

function mapStateToProps(state) {
  return {
    entries: state.entries,
  };
}

function mapActionsToProps(actions) {
  return {
    fetchEntries: actions.fetchEntries,
  };
}

export const ConnectedEntriesIndexPage = connectToAppProvider(mapStateToProps, mapActionsToProps)(EntiresIndexPageRenderer);
