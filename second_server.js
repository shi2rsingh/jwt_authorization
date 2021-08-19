require('dotenv').config();

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
  {
    name: 'Shishir Singh',
    title: 'Post 1',
  },
  {
    name: 'Robin Singh',
    title: 'Post 2',
  },
];

app.get('/posts', authenticateToken, (req, resp) => {
  let post = {};
  console.log(req.user);
  if (req.user) {
    post = posts.filter((p) => p.name === req.user.name);
  }
  resp.json(post);
});

app.post('/login', (req, resp) => {
  const username = req.body.username;

  const user = {
    name: username,
  };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  resp.json({ accessToken: accessToken });
});

function authenticateToken(req, resp, next) {
  console.log({ req });
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log({ token, authHeader });
  if (token == null) return resp.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return resp.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(4000);
