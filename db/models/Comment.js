import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    discussionId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 5000,
    },
},
{timestamps: true}
);

export default mongoose.model("Comment", CommentSchema);