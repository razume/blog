import React from "react";
import blogs from "../blogPosts.json";

export default function BlogEntry({ match }) {
  const entry = blogs.find(({ id }) => id === match.params.entryId);
  return (
    <div className="page-content-container">
      <h3 style={{ textAlign: "center" }}>{entry.title}</h3>
      <p>{entry.body}</p>
    </div>
  );
}
