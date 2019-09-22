import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// Assets
import './assets/css/bootstrap.css';
import './assets/css/mitosys.css';

// Components
import MitoSys from './MitoSys';

ReactDOM.render(<MitoSys />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
