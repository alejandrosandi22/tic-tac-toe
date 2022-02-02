import React, { Component } from 'react';
import Game from './components/Game/Game';
import './App.scss';

class App extends Component {

  render(){
    return (
      <div className='app-container'>
        <Game/>
      </div>
    );
  }


}

export default App;
