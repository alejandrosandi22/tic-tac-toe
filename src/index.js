import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import enviorement from './environments/environment'
import firebase from 'firebase/compat/app';

firebase.initializeApp(enviorement.firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
