import React, { Component } from 'react';

import styles from './Test.scss';

export default class Test extends Component {
  render() {
    return (
      <div className={styles.container}>
        <button onClick={this.handleClick}>test</button>
      </div>
    );
  }

  handleClick = () => {
    console.log('hello'); // eslint-disable-line
  }
}
