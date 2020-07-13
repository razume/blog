import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import BlogPage from "./components/BlogPage";
import ProjectsPage from "./components/ProjectsPage";
import ResumePage from "./components/ResumePage";
import LoginPage from "./components/LoginPage";
import "./App.css";

export default function App() {
  const [auth, setAuth] = useState({});
  const [selectedPost, setSelectedPost] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    attemptLoginFromToken();
  }, []);

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

  const toggleTheme = () => {
    if (
      !document.documentElement.getAttribute("data-theme") ||
      document.documentElement.getAttribute("data-theme") === "root"
    ) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "root");
    }
  };

  return (
    <Router>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div className="body-wrapper">
          <nav className="nav-bar">
            <div className="nav-home-container">
              <div className="nav-item">
                <Link to="/">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21 8.77217L14.0208 1.79299C12.8492 0.621414 10.9497 0.621413 9.77817 1.79299L3 8.57116V23.0858H10V17.0858C10 15.9812 10.8954 15.0858 12 15.0858C13.1046 15.0858 14 15.9812 14 17.0858V23.0858H21V8.77217ZM11.1924 3.2072L5 9.39959V21.0858H8V17.0858C8 14.8767 9.79086 13.0858 12 13.0858C14.2091 13.0858 16 14.8767 16 17.0858V21.0858H19V9.6006L12.6066 3.2072C12.2161 2.81668 11.5829 2.81668 11.1924 3.2072Z"
                      fill="currentColor"
                    />
                  </svg>
                  {/*<img id="home-icon" src={require("./media/icons/home.svg")} />*/}
                </Link>
              </div>
            </div>
            <div className="nav-items-container">
              <div className="nav-item">
                <Link to="/blog" onClick={() => setSelectedPost(false)}>
                  Blog
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/projects" onClick={() => setSelectedProject(false)}>
                  Projects
                </Link>
              </div>
              <div className="nav-item">
                <Link to="/resume">Resume</Link>
              </div>
            </div>
            <div
              style={{
                marginRight: "8px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {auth.id && (
                <Link to="/login" id="admin-tag">
                  Admin
                </Link>
              )}
              <svg
                id="dark-mode-icon"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={toggleTheme}
              >
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </nav>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="content-wrapper">
              <Switch>
                <Route path="/blog">
                  <BlogPage
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                  />
                </Route>
                <Route path="/projects">
                  <ProjectsPage
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                  />
                </Route>
                <Route path="/resume">
                  <ResumePage />
                </Route>
                <Route path="/login">
                  <LoginPage auth={auth} setAuth={setAuth} />
                </Route>
                <Route path="/">
                  <HomePage />
                </Route>
              </Switch>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-content">
            <a
              href="https://github.com/razume"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={require("./media/icons/gh.svg")} />
            </a>
            <a
              href="https://www.linkedin.com/in/leighton-pitman/"
              target="_blank"
            >
              <img src={require("./media/icons/li.svg")} />
            </a>
            <a href="https://www.facebook.com/leighton.pitman" target="_blank">
              <img src={require("./media/icons/fb.svg")} />
            </a>
            <a href="https://www.instagram.com/leightonpitman/" target="_blank">
              <img src={require("./media/icons/ig.svg")} />
            </a>
          </div>
          <div className="footer-info">
            <Link to="/login">
              <img
                src={require("./media/icons/crown.svg")}
                alt="administrator login"
              />
            </Link>
            <a href="mailto:leightonpitman14@gmail.com">
              leightonpitman14@gmail.com
            </a>
            &copy; Leighton Pitman 2020
          </div>
        </footer>
      </div>
    </Router>
  );
}
