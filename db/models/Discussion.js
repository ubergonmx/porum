import mongoose from "mongoose";

const DiscussionSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 5000,
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