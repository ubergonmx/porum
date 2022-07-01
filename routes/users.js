import express from 'express';
import bcrypt from 'bcrypt';
import User from '../db/models/User.js';
import Discussion from '../db/models/Discussion.js';
import Comment from '../db/models/Comment.js';
import { checkAuth } from './auth.js';
import { calcDate, formatDate, birthday, truncate, upload } from '../utils/helper.js';

const userRoute = express.Router();

//RETURN HOME PAGE
userRoute.get('/', checkAuth, (req, res) => {
    res.redirect('/home');
});

//UPDATE
userRoute.put("/:id", upload.fields([
    { name: 'profileImg', maxCount: 1 },
    { name: 'coverImg', maxCount: 1 }
]), async (req, res) => {
    console.log(req.file);
    console.log(">>FILES<<");
    console.log(req.files);
    if(req.params.id === req.body.userId || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = bcrypt.genSaltSync(10);
                req.body.password = bcrypt.hashSync(req.body.password, salt);

            } catch (err) {
                res.status(500).json(err);
                return;
            }
        }
        try {
            //If there is a profile image, add profileImg property
            if(req.files.profileImg){
                const profileImg = req.files.profileImg[0];
                req.body.profileImg =  profileImg.destination.replaceAll('./public/', '') + profileImg.filename;
            }

            //If there is a cover image, add coverImg property
            if(req.files.coverImg){
                const coverImg = req.files.coverImg[0];
                req.body.coverImg = coverImg.destination.replaceAll('./public/', '') + coverImg.filename;
            }
            console.log(req.body);
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body 
            });
            res.status(200).json("User updated");
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
            return;
        }
    }
    else{
        res.status(403).json("You are not authorized to update this user");
        return;
    }
});

//DELETE
userRoute.delete("/:id", async (req, res) => {
    if(req.params.id === req.body.userId || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User deleted");
        } catch (err) {
            res.status(500).json(err);
            return;
        }
    }
    else{
        res.status(403).json("You are not authorized to delete this user");
        return;
    }
});

//GET
userRoute.get("/:id", checkAuth, async (req, res) => {
    try {
        if(req.params.id === req.session.user._id){
            res.redirect('/profile');
        }
        else{
            const user = await User.findById(req.params.id).lean();
            const discussions = await Discussion.find({ userId: user._id }).lean();
            const comments = await Comment.find({ userId: user._id }).lean();
            for(var comment of comments){
                comment.discussion = await Discussion.findOne({ _id: comment.discussionId }).select('title').lean();
            }
            res.render('user', {
                title: user.username,
                styles: ['profile.css'],
                scripts: ['profile.js'],
                user: req.session.user,
                profile: user,
                discussions: discussions,
                comments: comments,
                hasPosts: discussions.length > 0 || comments.length > 0,
                isCurrentUser: false,
                helpers: {
                    calcDate, formatDate, birthday, truncate
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
});
//GET
userRoute.get("/get/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        console.log(user._doc);
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
        return;
    }
});




export default userRoute;