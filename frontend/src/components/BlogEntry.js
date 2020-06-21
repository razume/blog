import React from "react";

export default function BlogEntry(props) {
  return (
    <div className="page-content-container">
      <h3 style={{ textAlign: "center" }}>{props.entryTitle}</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <img
          style={{
            width: "55%",
            borderRadius: "5px",
          }}
          src={props.imgPath}
        />
      </div>

      <div>{props.entryBody}</div>
    </div>
  );
}
