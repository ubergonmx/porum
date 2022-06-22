import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
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
    hasRead: {
        type: Boolean,
        default: false,
    },
},
{timestamps: true}
);

export default mongoose.model("Notification", NotificationSchema);