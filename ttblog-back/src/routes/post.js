const express = require('express')
const { createPost, listPosts, getPost } = require('../db/posts');

const router = express.Router()

router.get('/', async (req, res) => {
  return listPosts(req.query.userId)
    .then(posts => {
      res.status(200);
      res.json(posts);
    })
    .catch(e => {
      res.status(400);
      res.send(e.message);
    });
});

router.get('/:id', async (req, res) => {
  return getPost(req.params.id)
    .then(post => {
      res.status(200);
      res.json(post);
    })
    .catch(e => {
      res.status(400);
      res.send(e.message);
    });
});

router.post('/new', async (req, res) => {
  return createPost({
    token: req.query.token,
    ...req.body
  }).then(post => {
    res.status(200);
    res.json(post);
  }).catch(e => {
    res.status(400);
    res.send(e.message);
  });
});


module.exports = router;