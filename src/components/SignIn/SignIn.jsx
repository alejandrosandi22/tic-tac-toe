import React, { Component } from "react";
import './SignIn.scss';

export default class SignIn extends Component {
  render() {
    return(
      <div className="sign-in-container">
        <div className="sign-in-wrapper">
          <h1 className="sign-in-title">Sign In</h1>
          <button className="sign-in-button"><img src="https://i.ibb.co/NxYZR5b/google-icon.png" alt="google-icon" /> Sign In With Google</button>
          <a className="skip" href="https://alejandrosandi.ml">Skip</a>
        </div>
      </div>
    );
  }
}
