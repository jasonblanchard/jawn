import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Test extends Component {
  render() {
    return (
      <div>
        <button onClick={this._handleClick}>test</button>
      </div>
    )
  }

  _handleClick = () => {
    console.log('hello');
  }
}

ReactDOM.render(<Test />, document.getElementById('app'));
