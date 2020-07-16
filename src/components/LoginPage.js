import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LoginPage({ auth, setAuth }) {
  // const [auth, setAuth] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    attemptLoginFromToken();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      username,
      password,
    };

    axios
      .post("/api/auth", credentials)
      .then((response) => {
        window.localStorage.setItem("token", response.data.token);
        attemptLoginFromToken();
      })
      .catch((ex) => setError(ex.response.data.message));
  };

  const attemptLoginFromToken = () => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return;
    }
    if (!token) {
      return;
    }
    axios
      .get("/api/auth", {
        headers: {
          authentication: token,
        },
      })
      .then((response) => setAuth(response.data));
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
  };

  return (
    <div id="login-page">
      {!auth.id ? (
        <div>
          <h2>Administrator login</h2>
          <br />
          <p>{error}</p>
          <form id="login-form" onSubmit={onSubmit}>
            <label>Username</label>
            <input
              className="text-field"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <br />
            <label>Password</label>
            <input
              className="text-field"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <input id="submit-button" type="submit" value="Sign in" />
          </form>
        </div>
      ) : (
        <div id="logout-container">
          <p>
            Signed in as {auth.username}. This user has administrative
            privileges.
          </p>
          <button id="logout-button" onClick={logout}>
            log out
          </button>
        </div>
      )}
    </div>
  );
}
