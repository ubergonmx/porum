import express from 'express';
import Discussion from '../db/models/Discussion.js';
import Comment from '../db/models/Comment.js';
import User from '../db/models/User.js';
import { checkAuth } from './auth.js';
import { formatDate } from './utils.js';

const discussionRoute = express.Router();

//RETURN HOME PAGE
discussionRoute.get('/', (req, res) => {
    res.redirect('/home');
});

//GET ALL DISCUSSIONS
discussionRoute.get('/all', async (req, res) => {
    try{
        const discussions = await Discussion.find({});
        res.status(200).json(discussions);
    }catch(err){
        res.status(500).json(err);
        return;
    }
});

//CREATE
discussionRoute.post('/', async (req, res) => {
    try {
        const newDiscussion = new Discussion(req.body);
        const discussion = await newDiscussion.save();
        res.status(200).json(discussion);
    } catch (err) {
        res.status(500).json(err);
        return;
    }
});

//UPDATE
discussionRoute.put('/:id', async (req, res) => {
    try{
        const discussion = await Discussion.findById(req.params.id);
        if(discussion.userId === req.body.userId || req.body.isAdmin){
            await discussion.updateOne(req.body);
            res.status(200).json("Discussion updated");
        }
        else{
            res.status(403).json("You can update only your own discussions");
        }
    } catch (err) {
        res.status(500).json(err);
        return;
    }
});

//DELETE
discussionRoute.delete('/:id', async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if(discussion.userId === req.body.userId || req.body.isAdmin){
            await discussion.deleteOne();
            res.status(200).json("Discussion deleted");
        }
        else{
            res.status(403).json("You can delete only your own discussions");
        }
    } catch (err) {
        res.status(500).json(err);
        return;
    }
});

//GET
discussionRoute.get('/:id', checkAuth, async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id).lean();
        discussion.author = await User.findById(discussion.userId).select("username profileImg").lean();
        const comments = await Comment.find({ discussionId: req.params.id }).lean();
        console.log(discussion);
        res.render('discussion', {
            title: discussion.title,
            styles: ['discussion.css'],
            scripts: ['discussion.js'],
            user: req.session.user,
            discussion: discussion,
            comments: comments,
            isCurrentUser: req.session.user._id.toString() === discussion.userId.toString(),
            helpers: { formatDate }
        });

    } catch (err) {
        res.status(500).json(err);
        return;
    }
});



//FOLLOW
discussionRoute.put('/:id/follow', async (req, res) => {
    try{
        const discussion = await Discussion.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(!discussion.followers.includes(req.body.userId)){
            await discussion.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json("Discussion followed");
        }
        else{
            res.status(403).json("Discussion already followed");
        }

    } catch (err) {
        res.status(500).json(err);
        return;
    }
});

//UNFOLLOW
discussionRoute.put("/:id/unfollow", async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(discussion.followers.includes(req.body.userId)){
            await discussion.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json("Discussion unfollowed");
        }
        else{
            res.status(403).json("Discussion already unfollowed");
        }
    } catch (err) {
        res.status(500).json(err);
        return;
    }
});


//---- COMMENTS ----//

//GET ALL COMMENTS
discussionRoute.get('/:id/comment/all', async (req, res) => {
    try{
        const comments = await Comment.find({discussionId: req.params.id});
        res.status(200).json(comments);
    }catch(err){
        res.status(500).json(err);
        return;
    }
});

//CREATE COMMENT
discussionRoute.post('/:id/comment', async (req, res) => {
    try {
        const newComment = new Comment({
            userId: req.body.userId,
            discussionId: req.params.id,
            content: req.body.content,
        });
        const comment = await newComment.save();
        const discussion = await Discussion.findById(req.params.id);
        await discussion.updateOne({ $push: { comments: comment._id } });
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
        return;
    }
});


//UPDATE COMMENT
discussionRoute.put("/:id/comment/:commentId", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(comment.userId === req.body.userId || req.body.isAdmin){
            await comment.updateOne(req.body);
            res.status(200).json("Comment updated");
        }            
        else{
            res.status(403).json("You can update only your own comments");
            return;
        }
    } catch (err) {
        res.status(500).json(err);
        return;
    }
});

//DELETE COMMENT
discussionRoute.delete("/:id/comment/:commentId", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        const discussion = await Discussion.findById(req.params.id);
        if(comment.userId === req.body.userId || req.body.isAdmin){
            await comment.deleteOne();
            await discussion.updateOne({ $pull: { comments: req.params.commentId } });
            res.status(200).json("Comment deleted");
        }
        else{
            res.status(403).json("You can delete only your own comments");
            return;
        }
    } catch (err) {
        res.status(500).json(err);
        return;
    }
});

//---- NOTIFY----//

//NOTIFY ALL FOLLOWERS
discussionRoute.get('/:id/notify/all', async (req, res) => {

});




export default discussionRoute;
