require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDBに接続しました。"))
  .catch(err => console.error(err));

const threadSchema = new mongoose.Schema({
    userId: String,
    channelId: String,
    threadId: String,
    threadName: String,
    count: { type: Number, default: 0 }
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;