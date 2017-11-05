import React, { Component } from 'react';

import Entry from 'src/components/Entry';

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
        {isSelected ? <div>selected</div> : <Entry className={css.entry} {...this.props} />}
      </div>
    );
  }

  select = () => {
    this.setState({ isSelected: true });
  }
}
