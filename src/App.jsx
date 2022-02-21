import React, { Component } from 'react';
import Game from './components/Game/Game';
import './App.scss';
import Router from './components/routes/router';

class App extends Component {

  render(){
    return (
      <div className='app-container'>
        <Router />
      </div>
    );
  }


}

export default App;
