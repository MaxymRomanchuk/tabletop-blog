const { User } = require('./models');
const uuid = require('uuid');

async function signup(email, password) {
  const user = await User.findOne({ email });

  if(user) {
    throw Error('Such user already exists!');
  }
  
  return User.create({
    email,
    password,
    id: uuid.v4(),
    token: uuid.v4(),
  });
}

async function login(email, password) {
  const user = await User.findOne({ email });

  if(!user) {
    throw new Error('Such user does not exist!');
  } else if(user.password !== password) {
    throw new Error('Incorrect password.');
  }

  return user;
}

module.exports = {
  signup,
  login,
}