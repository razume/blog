import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import BlogEntry from "./BlogEntry";
import blogs from "../blogPosts.json";

export default function BlogPage() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <ul className="blog-links-container">
        {blogs.map((blog) => {
          return (
            <Link className="blog-link" to={`${url}/${blog.id}`}>
              <li key={blog.id}>{blog.title}</li>
            </Link>
          );
        })}
      </ul>

      <Route path={`${url}/:entryId`} component={BlogEntry} />
    </div>
  );
}
