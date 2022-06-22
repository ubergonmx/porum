import mongoose from "mongoose";
import Discussion from './models/Discussion.js';
import User from './models/User.js';
import Comment from "./models/Comment.js";
import { tags } from './data.js';

export function generateData(){
    const initialUsers = [
        new User({
            username: "test",
            password: "test",
            firstname: "test",
            lastname: "test",
            email: "",
            bio: "",
            birthday: new Date(2022, 5, 22),
            phoneNumber: "",
            profileImg: "images/users/userDefault.jpg",
            coverImg: "images/users/coverDefault.jpg",
        }),
        new User({
            username: "test",
            password: "test",
            firstname: "test",
            lastname: "test",
            email: "",
            bio: "",
            birthday: new Date(2022, 5, 22),
            phoneNumber: "",
            profileImg: "images/users/userDefault.jpg",
            coverImg: "images/users/coverDefault.jpg",
        }),
    ];

    const initialDiscussions = [
        new Discussion({
            title: "test",
            content: "test",
            tag: {
                name: "test",
                color: "test",
            }
        }),
    ];

    const initialComments = [
        new Comment({
            content: "test",
        })
    ];







    var sampleUsers = [];
    
    for(var user of initialUsers){
        sampleUsers.push(user.save());
    }
    

    for(var user of sampleUsers){

    }
}