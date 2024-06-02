const authRoute = require('./auth');
const postRoute = require('./post');
const commentRoute = require('./comment');

function applyRoutes(app) {
  app.use('/auth', authRoute);
  app.use('/post', postRoute);
  app.use('/comment', commentRoute);
  return app;
}

module.exports = applyRoutes;