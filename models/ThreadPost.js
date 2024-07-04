const mongoose = require('mongoose');

// データベース接続
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDBに接続しました。"))
    .catch(err => console.error(err));

const threadPostSchema = new mongoose.Schema({
    channelId: {
        type: String,
        required: true
    },
    postCount: {
        type: Number,
        required: true,
        unique: true
    },
    uniqueID: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
    },
    content: {
        type: String,
    },
    url: {
        type: Map,
        of: String
    },
    imageURL: {
        type: String,
        default: null
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const ThreadPost = mongoose.model('ThreadPost', threadPostSchema);

module.exports = ThreadPost;