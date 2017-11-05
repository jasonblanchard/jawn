import PropTypes from 'prop-types';
import React, { Component } from 'react';

import connectToAppProvider from 'src/state/connectToAppProvider';

export default class EntriesIndexPage extends Component {
  static propTypes = {
    entries: PropTypes.array,
  }

  static defaultProps = {
    entries: [],
  }

  render() {
    return this.props.entries.map(entry => (
      <div key={entry.id}>
        <p>{entry.text}</p>
      </div>
    ));
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
