const { Post, validateToken } = require('./models');
const uuid = require('uuid');

async function createPost({ token, title, content, imageUrl, videoUrl }) {
  const userId = await validateToken(token);

  if(!title || !content) {
    throw new Error('Incorrect params.');
  }

  return Post.create({
    id: uuid.v4(),
    title,
    userId,
    content,
    imageUrl: imageUrl || 'https://cwi-summits-limited.odoo.com/web/image/product.template/1/image_1024?unique=68a8d7f',
    videoUrl,
    ts: Date.now()
  })
}

async function listPosts(userId) {
  return Post.find(userId ? { userId } : {}, { content: 0 }).sort({ ts: -1 }).limit(10);
}

async function getPost(postId) {
  return Post.findOne({ id: postId }).then(res => {
    if(!res) throw new Error('Invalid post ID.');
    return res;
  });
}

async function deletePost(token, postId) {
  const userId = await validateToken(token);
  const post = await Post.findOne({ id: postId, userId });
  
  if(!post) {
    throw new Error('Invalid Post ID');
  }

  return Post.deleteOne({ id: post.id });
}

module.exports = {
  createPost,
  listPosts,
  getPost,
  deletePost,
}