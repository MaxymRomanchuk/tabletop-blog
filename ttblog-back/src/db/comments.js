const { Comment, validateToken } = require('./models');
const uuid = require('uuid');

async function createComment({ token, postId, content }) {
  const userId = await validateToken(token);
  if(!userId || !postId || !content) {
    throw new Error('Incorrect params.');
  }

  return Comment.create({
    id: uuid.v4(),
    postId,
    userId,
    content,
    ts: Date.now()
  })
}

async function listComments(postId) {
  if(!postId || postId === 'undefined') {
    throw new Error('Post ID is required!');
  }
  return Comment.aggregate([
    {
      $match: {
        postId
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: 'id',
        as: 'user'
      }
    }
  ]).sort({ ts: -1 }).limit(100);
}

module.exports = {
  createComment,
  listComments,
}