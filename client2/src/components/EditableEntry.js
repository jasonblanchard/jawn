import React, { Component } from 'react';

import Entry from 'src/components/Entry';

import cssClassNames from './EditableEntry.scss';

export default class EditableEntry extends Component {
  state = {
    isSelected: false,
  }

  render() {
    const { isSelected } = this.state;
    return (
      <div className={cssClassNames.container} onDoubleClick={this.select}>
        {isSelected ? null : <button className={cssClassNames.selectButton} onClick={this.select}>edit</button>}
        {isSelected ? <div>selected</div> : <Entry className={cssClassNames.entry} {...this.props} />}
      </div>
    );
  }

  select = () => {
    this.setState({ isSelected: true });
  }
}
