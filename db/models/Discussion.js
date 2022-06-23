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
        maxlength: 150,
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 5000,
    },    
    tag: {
        name :{ 
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50,
        },
        color: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50
        }
    },
    followers: {
        type: [String],
        default: [],
    },
    comments: {
        type: [String],
        default: [],
    },
    editedAt: {
        type: Date,
        default: null,
    }
},
{timestamps: true}
);

export default mongoose.model("Discussion", DiscussionSchema);