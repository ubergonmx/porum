import mongoose from "mongoose";

const DiscussionSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        min: 1,
        max: 50,
    },
    content: {
        type: String,
        required: true,
        min: 1,
        max: 5000,
    },
    followers: {
        type: [String],
        default: [],
    },
    comments: {
        type: [String],
        default: [],
    },
},
{timestamps: true}
);

export default mongoose.model("Discussion", DiscussionSchema);