import React, { Component } from "react";
import Nav from "../Nav/Nav";
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
            <td><i className="far fa-circle"></i></td>
            <td><i className="fal fa-times"></i></td>
            <td><i className="fal fa-times"></i></td>
          </tr>
          <tr>
            <td><i className="fal fa-times"></i></td>
            <td><i className="far fa-circle"></i></td>
            <td><i className="far fa-circle"></i></td>
          </tr>
          <tr>
            <td><i className="far fa-circle"></i></td>
            <td><i className="fal fa-times"></i></td>
            <td><i className="far fa-circle"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function StartButtons() {
  return(
    <div className="start-wrapper">
      <button className="start-game"></button>
      <button className="start-game"></button>
    </div>
  );
}

export default class Game extends Component {
  render(){
    return(
      <div className="game-container">
        <Nav/>
        <div className="game-wrapper">
          <Stats/>
          <TicTacToe/>
          <StartButtons/>
        </div>
      </div>
    );
  }
}