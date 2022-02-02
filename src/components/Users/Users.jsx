import React, { Component } from "react";
import './Users.scss';

export default class Users extends Component {
  render(){
    return(
      <div className={`bg-container ${this.props.toggleShow}`}>
        <div className="users-container">
          <h2 className="users-title">Users<i onClick={this.props.toggleStyle} className="fas fa-times"></i></h2>
          <div className="users-wrapper">
            <div className="user">
              <img className="photo-user" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="user" />
              <div className="user-data">
                <p className="user-name">Thomas Gould</p>
                <div>
                  <button className="invite"></button>
                </div>
              </div>
              <div className="online-wrapper">
                <div className="online"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}