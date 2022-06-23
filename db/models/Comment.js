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
    editedAt: {
        type: Date,
        default: null,
    }
},
{timestamps: true}
);

export default mongoose.model("Comment", CommentSchema);