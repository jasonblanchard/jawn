import PropTypes from 'prop-types';
import React, { Component } from 'react';

import connectToAppProvider from 'src/state/connectToAppProvider';
import Entry from 'src/components/Entry';
import { EditEntryFormContainer } from 'src/components/EditEntryForm';

import css from './EditableEntry.scss';

export default class EditableEntry extends Component {
  static propTypes = {
    didUpdateEntryId: PropTypes.string,
    entry: PropTypes.object,
  };

  state = {
    isSelected: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.didUpdateEntryId === this.props.entry.id) {
      this.setState({
        isSelected: false,
      });
    }
  }

  render() {
    const { isSelected } = this.state;
    return (
      <div className={css.container} onDoubleClick={this.select}>
        {isSelected ? null : <button className={css.selectButton} onClick={this.select}>edit</button>}
        {isSelected ? <EditEntryFormContainer focusOnMount onCancel={this.deselect} {...this.props} /> : <Entry className={css.entry} {...this.props} />}
      </div>
    );
  }

  select = () => {
    this.setState({ isSelected: true });
  }

  deselect = () => {
    this.setState({ isSelected: false });
  }
}

function mapStateToProps(state) {
  return {
    didUpdateEntryId: state.didUpdateEntryId,
  };
}

export const EditableEntryContainer = connectToAppProvider(mapStateToProps)(EditableEntry);
