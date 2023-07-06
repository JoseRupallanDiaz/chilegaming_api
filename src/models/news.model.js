import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const newsModel = mongoose.model("News", newsSchema);

export default newsModel;

