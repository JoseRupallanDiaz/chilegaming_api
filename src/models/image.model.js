import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    image: { type: Buffer, required: true}
});

const imageModel = mongoose.model("Image", imageSchema);

export default imageModel;
