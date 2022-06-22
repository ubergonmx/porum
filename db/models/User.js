import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    firstname: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    lastname: {
        type: String,
        required: true,
        min: 1,
        max: 50,
    },
    birthday: {
        type: Date,
    },
    phoneNumber: {
        type: String,
        match: /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[456789]\d{9}|(\d[ -]?){10}\d$/,
    },
    profileImg: {
        type: String,
        default: "images/users/userDefault.jpg",
    },
    coverImg: {
        type: String,
        default: "images/users/coverDefault.jpg",
    },
    followings: {
        type: [String],
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
{timestamps: true}
);

export default mongoose.model("User", UserSchema);