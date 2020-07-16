const express = require("express");
const path = require("path");
const db = require("./db.js");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./build")));

app.use((req, res, next) => {
  console.log("REQ HEADERS:", req.headers.authentication);
  if (!req.headers.authentication) {
    console.log("*****AUTHENTICATION HEADER NOT FOUND*****");
    return next();
  }
  db.getUserFromToken(req.headers.authentication)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch(next);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.post("/api/auth", (req, res, next) => {
  db.authenticate(req.body)
    .then((token) => res.send({ token }))
    .catch(next);
});

app.get("/api/auth", (req, res, next) => {
  if (!req.user) {
    const err = Error("NOT AUTHENTICATED");
    err.status = 401;
    return next(err);
  }
  res.send(req.user);
});

console.log(path.join(__dirname, "public", "index.html"));

db.sync();
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
