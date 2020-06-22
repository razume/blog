import React from "react";

export default function LoginPage() {
  return (
    <div id="login-page">
      <h2>Administrator login</h2>
      <br />
      <form id="login-form">
        <label>Username</label>
        <input className="text-field" type="text"></input>
        <br />
        <label>Password</label>
        <input className="text-field" type="password"></input>
        <br />
        <input id="submit-button" type="submit" value="Sign in" />
      </form>
    </div>
  );
}
