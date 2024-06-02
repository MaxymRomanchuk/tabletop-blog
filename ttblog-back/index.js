const mongoose = require("mongoose");
const express = require('express');
const cors = require('cors');
const applyRoutes = require('./src/routes');

const mongoUrl = 'mongodb://localhost:27017/local';
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoUrl);
  console.log('DB connected!');
}

const app = express();
app.use(express.json());
app.options('*', cors());
app.use(cors());

applyRoutes(app);

app.use('/static', express.static('public'));
app.listen(3000)
console.log('Server started');