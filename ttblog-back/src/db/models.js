const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  id: String,
  userId: String,
  postId: String,
  content: String,
  ts: Number,
});

const postSchema = new mongoose.Schema({
  id: String,
  title: String,
  userId: String,
  imageUrl: String,
  videoUrl: String,
  content: String,
  ts: Number,
});

const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  password: String,
  token: String,
});

const Comment = mongoose.model('Comment', commentSchema);
const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);

async function validateToken(token) {
  const user = await User.findOne({ token });
  if(!user) {
    throw new Error('Unauthorized');
  }
  return user.id;
}

module.exports = {
  Comment,
  Post,
  User,
  validateToken,
}