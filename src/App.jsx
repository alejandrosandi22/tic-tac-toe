import React, { Component } from 'react';
import SignIn from './components/SignIn/SignIn';
import './App.scss';

class App extends Component {

  render(){
    return (
      <div className='app-container'>
        <SignIn/>
      </div>
    );
  }


}

export default App;
