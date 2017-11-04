import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// TODO: Encode entire user object in cookie and load up from there.
const initialState = { test: 'val' };

ReactDOM.render(<App initialState={initialState} />, document.getElementById('app'));
