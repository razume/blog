import React from "react";
import projects from "../projects.json";

export default function ProjectEntry({ match }) {
  const entry = projects.find(({ id }) => id === match.params.entryId);
  return (
    <div className="page-content-container">
      <h3 style={{ textAlign: "center" }}>{entry.title}</h3>
      <p>{entry.description}</p>
    </div>
  );
}
