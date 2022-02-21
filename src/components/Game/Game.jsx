import React, { Component, useRef } from "react";
import Users from "../Users/Users";
import './Game.scss';

function Stats() {
  return(
    <div className="stats-container">
      <div className="games you-win">
        <h3><i className="fal fa-times"></i> (You)</h3>
        <h4>0</h4>
      </div>
      <div className="games ties">
        <h3>Ties</h3>
        <h4>0</h4>
      </div>
      <div className="games adversary-win">
        <h3><i className="far fa-circle"></i> (CPU)</h3>
        <h4>0</h4>
      </div>
    </div>
  );
}

function TicTacToe() { 


  return(
    <div className="tic-tac-toe-container">
      <table>
        <tbody>
          <tr>
            <td id='1'></td>
            <td id='2'></td>
            <td id='3'></td>
          </tr>
          <tr>
            <td id="4"></td>
            <td id="5"></td>
            <td id="6"></td>
          </tr>
          <tr>
            <td id="7"></td>
            <td id="8"></td>
            <td id="9"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function StartButtons(props) {
  return(
    <div className="start-wrapper">
      <button onClick={props.toggleStyle} className="start-game"></button>
      <button className="start-game"></button>
    </div>
  );
}

export default class Game extends Component {

  state = {
    toggle: false
  }

  toggleStyle = (e) => {
    this.setState({
      toggle: !this.state.toggle ? true : false
    });
    console.log(this.state.toggle);
  }

  render(){
    return(
      <div className="game-container">
        <Users toggleStyle={this.toggleStyle} toggleShow={this.state.toggle}/>
        <div className="game-wrapper">
          <Stats/>
          <TicTacToe/>
          <StartButtons toggleStyle={this.toggleStyle}/>
        </div>
      </div>
    );
  }
}