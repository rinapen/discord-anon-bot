require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDBに接続しました。"))
    .catch(err => console.error(err));

const threadSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        channelIds: {
            main: {
                type: String,
                required: true
            },
            sub: {
                type: String,
                required: true
            }
        },
        threadName: {
            type: String,
            required: true
        },
        postCounter: {
            type: Number,
            default: 0
        }
});

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;
