import React, { Component } from 'react';

import Entry from 'src/components/Entry';
import { ConnectedEntryForm } from 'src/components/EntryForm';

import css from './EditableEntry.scss';

export default class EditableEntry extends Component {
  state = {
    isSelected: false,
  }

  render() {
    const { isSelected } = this.state;
    return (
      <div className={css.container} onDoubleClick={this.select}>
        {isSelected ? null : <button className={css.selectButton} onClick={this.select}>edit</button>}
        {isSelected ? <ConnectedEntryForm onSubmit={this.deselect} onCancel={this.deselect} {...this.props} /> : <Entry className={css.entry} {...this.props} />}
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
