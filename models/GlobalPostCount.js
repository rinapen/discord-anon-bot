const mongoose = require('mongoose');
// データベース接続
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDBに接続しました。"))
    .catch(err => console.error(err));

const globalPostCountSchema = new mongoose.Schema({
    postCount: {
        type: Number,
        required: true
    }
});
const GlobalPostCount = mongoose.model('GlobalPostCount', globalPostCountSchema);
module.exports = GlobalPostCount;
