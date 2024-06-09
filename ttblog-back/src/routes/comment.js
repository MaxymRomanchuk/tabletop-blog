const express = require('express')
const { createComment, listComments } = require('../db/comments');

const router = express.Router()

router.get('/', async (req, res) => {
  return listComments(req.query.post)
    .then(comments => {
      res.status(200);
      res.json(comments.map(comment => ({
        ...comment,
        user: comment.user[0].email.split('@')[0],
      })));
    })
    .catch(e => {
      res.status(400);
      res.send(e.message);
    });
});

router.post('/new', async (req, res) => {
  return createComment({
    token: req.query.token,
    ...req.body
  }).then(comment => {
    res.status(200);
    res.json(comment);
  }).catch(e => {
    res.status(400);
    res.send(e.message);
  });
});


module.exports = router;