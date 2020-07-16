import React, { useState, useEffect } from "react";
import { Link, Route, useRouteMatch } from "react-router-dom";
import BlogEntry from "./BlogEntry";
import blogs from "../blogPosts.json";

export default function BlogPage({ selectedPost, setSelectedPost }) {
  let { url } = useRouteMatch();

  useEffect(() => {
    if (!isNaN(url.slice(url.lastIndexOf("/") + 1))) {
      setSelectedPost(url.slice(url.lastIndexOf("/") + 1));
    } else {
      setSelectedPost("");
    }
  }, []);

  const handleClick = (blogId) => {
    setSelectedPost(blogId);
  };

  return (
    <div>
      {!selectedPost ? (
        <div>
          <h3 style={{ fontSize: "65px", textAlign: "center" }}>Blog Posts</h3>
          <ul className="blog-links-container">
            {blogs.map((blog) => {
              return (
                <li
                  style={{
                    listStyleType: "none",
                    margin: "0.25rem",
                  }}
                  key={blog.id}
                >
                  <Link
                    className="blog-link"
                    onClick={() => handleClick(blog.id)}
                    to={`${url}/${blog.id}`}
                  >
                    {blog.date}{" "}
                    <strong style={{ marginLeft: "2rem" }}>{blog.title}</strong>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div>
          <Route path={`${url}/:entryId`} component={BlogEntry} />
          <div
            className="floating-back-button"
            onClick={() => setSelectedPost(false)}
          >
            <p>back</p>
          </div>
        </div>
      )}
    </div>
  );
}
