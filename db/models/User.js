import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 20,
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
        min: 6,
    },
    firstname: {
        type: String,
        required: true,
        min: 1,
        max: 50,
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
        default: "images/user/userDefault.jpg",
    },
    coverImg: {
        type: String,
        default: "images/user/coverDefault.jpg",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},
{timestamps: true}
);

export default mongoose.model("User", UserSchema);