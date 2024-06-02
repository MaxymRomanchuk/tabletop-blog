const express = require('express')
const { signup, login } = require('../db/users');

const router = express.Router()

router.post('/signup', async (req, res) => {
  return signup(req.body.email, req.body.password)
    .then(user => {
      res.status(200);
      res.json({
        id: user.id,
        token: user.token,
      });
    })
    .catch(e => {
      res.status(400);
      res.send(e.message);
    });
});

router.post('/login', async (req, res) => {
  return login(req.body.email, req.body.password)
    .then(user => {
      res.status(200);
      res.json({
        id: user.id,
        token: user.token,
      });
    })
    .catch(e => {
      res.status(400);
      res.send(e.message);
    });
})

module.exports = router;