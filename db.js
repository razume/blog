const { Client } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");

const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost/blog_db"
);

client.connect();

const sync = async () => {
  const SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    CHECK (char_length(username) > 0)
  );
  `;
  await client.query(SQL);
  const [moe, lucy] = await Promise.all([
    createUser({ username: "lpitman", password: "leighton" }),
    createUser({ username: "lucy", password: "LUCY" }),
  ]);

  const token = await authenticate({ username: "lucy", password: "LUCY" });
  console.log("TOKEN:", token);
  const user = await getUserFromToken(token);
  console.log(user);
};

const readUsers = async () => {
  return (await client.query("SELECT * FROM users")).rows;
};

const getUserFromToken = async (token) => {
  const id = jwt.decode(token, process.env.JWT).id;
  const user = (await client.query("SELECT * FROM users WHERE id=$1", [id]))
    .rows[0];
  return user;
};

const authenticate = async ({ username, password }) => {
  const user = (
    await client.query("SELECT * FROM users WHERE username=$1", [username])
  ).rows[0];
  await compare({ plain: password, hashed: user.password });

  return jwt.encode({ id: user.id }, process.env.JWT);
};

const compare = async ({ plain, hashed }) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plain, hashed, (err, success) => {
      if (err) {
        return reject(err);
      }
      if (success) {
        return resolve();
      }
      reject({ message: "incorrect username or password" });
    });
  });
};

const createUser = async ({ username, password }) => {
  const hashed = await hash(password);
  return (
    await client.query(
      "INSERT INTO users(username, password) values ($1, $2) returning *",
      [username, hashed]
    )
  ).rows[0];
};

const hash = (plain) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plain, 10, (err, hashed) => {
      if (err) {
        return reject(err);
      }
      return resolve(hashed);
    });
  });
};

module.exports = {
  sync,
  authenticate,
  getUserFromToken,
  readUsers,
};
