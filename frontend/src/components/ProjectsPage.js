import React, { useState, useEffect } from "react";
import { Link, Route, useRouteMatch } from "react-router-dom";
import ProjectEntry from "./ProjectEntry";
import projects from "../projects.json";

export default function ProjectsPage({ selectedProject, setSelectedProject }) {
  let { url } = useRouteMatch();

  const handleClick = (projectId) => {
    setSelectedProject(projectId);
  };

  return (
    <div>
      {!selectedProject ? (
        <ul className="blog-links-container">
          {projects.map((project) => {
            return (
              <li
                style={{ listStyleType: "none", margin: "0.25rem" }}
                key={project.id}
              >
                <Link
                  className="blog-link"
                  onClick={() => handleClick(project.id)}
                  to={`${url}/${project.id}`}
                >
                  <strong style={{ marginLeft: "2rem" }}>
                    {project.title}
                  </strong>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>
          <Route path={`${url}/:entryId`} component={ProjectEntry} />
          <div
            className="floating-back-button"
            onClick={() => setSelectedProject(false)}
          >
            <p>{"<"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
