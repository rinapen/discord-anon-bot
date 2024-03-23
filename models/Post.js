require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDBに接続しました。"))
  .catch(err => console.error(err));
  
const postSchema = new mongoose.Schema({
    content: String,
    imageURL: String,
    author: String,
    isAnonymous: Boolean,
    uniqueID: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;