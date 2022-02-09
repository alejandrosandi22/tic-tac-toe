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

  const refId = useRef();
  
  var player1 = true;
  var player2 = false;
  
  let selectedBoxes = []; 

  const selectBox = (e) => {

    let box = selectedBoxes.filter(id => {
      let x = false;
      if (id === refId.current.id) {
        x = true;
      }
      return console.log(id, x);
    });
    
    refId.current = e.currentTarget;
    if (player1){
      refId.current.innerHTML = '<i class="far fa-circle"></i>';
      player1 = false;
      player2 = true;
    } else if (player2){
      refId.current.innerHTML = '<i class="fal fa-times"></i>';
      player1 = true;
      player2 = false;
    }
    selectedBoxes.push(refId.current.id);
    console.log(selectedBoxes);

    console.log(box)
    
  }

  return(
    <div className="tic-tac-toe-container">
      <table>
        <tbody>
          <tr>
            <td id="1" ref={refId} onClick={(e) => selectBox(e)}></td>
            <td id="2" ref={refId} onClick={(e) => selectBox(e)}></td>
            <td id="3" ref={refId} onClick={(e) => selectBox(e)}></td>
          </tr>
          <tr>
            <td id="4" onClick={(e) => selectBox(e)}></td>
            <td id="5" onClick={(e) => selectBox(e)}></td>
            <td id="6" onClick={(e) => selectBox(e)}></td>
          </tr>
          <tr>
            <td id="7" onClick={(e) => selectBox(e)}></td>
            <td id="8" onClick={(e) => selectBox(e)}></td>
            <td id="9" onClick={(e) => selectBox(e)}></td>
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