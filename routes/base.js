import express from 'express';
import Discussion from '../db/models/Discussion.js';
import User from '../db/models/User.js';
import Comment from '../db/models/Comment.js';
import { checkAuth, checkNoAuth } from './auth.js';
import { calcDate, formatDate, birthday, birthdayInput, truncate, isEqual } from './utils.js';

const baseRoute = express.Router();

baseRoute.get('/', (req, res) => {
    res.redirect('/home');
});

baseRoute.get('/index', (req, res) => {
    res.redirect('/home');
});

baseRoute.get('/newsfeed', (req, res) => {
    res.redirect('/home');
});

baseRoute.get('/home', checkAuth, async (req, res) => {
    const discussions = await Discussion.find({}).sort('-createdAt').lean();
    for(var discussion of discussions){
        discussion.author = await User.findOne({ _id: discussion.userId }).select("username profileImg").lean();
        // for(var comment of discussion.comments){
        //     comment.author = await User.findOne({ _id: comment.userId }).select("username profileImg").lean();
        // }
        //console.log(discussion);
        let numOfComments = discussion.comments.length;
        discussion.commentsNo = `${numOfComments} Comment${numOfComments > 1 ? 's' : ''}`;
    }
    
    res.render('index', {
        title: 'Home',
        styles: ['newsfeed.css'],
        scripts: ['newsfeed.js'],
        user: req.session.user,
        discussions: discussions,
        helpers: {calcDate, truncate}
    });
});

baseRoute.get('/login', checkNoAuth, (req, res) => {
    res.render('login', {
        title: 'Login',
        styles: ['login.css'],
        scripts: ['login.js'],
    });
});

baseRoute.get('/profile', checkAuth, async(req, res) => {
    const discussions = await Discussion.find({ userId: req.session.user._id }).lean();
    const comments = await Comment.find({ userId: req.session.user._id }).lean();
    for(var comment of comments){
        comment.discussion = await Discussion.findOne({ _id: comment.discussionId }).select('title').lean();
    }
    res.render('user', {
        title: 'Profile',
        styles: ['profile.css'],
        scripts: ['profile.js'],
        user: req.session.user,
        profile: req.session.user,
        discussions: discussions,
        comments: comments,
        hasPosts: discussions.length > 0 || comments.length > 0,
        isCurrentUser: true,
        helpers: {
            calcDate, formatDate, birthday, truncate
        }
    });
});


baseRoute.get('/settings', checkAuth, async(req, res) => {
    const user = await User.findById(req.session.user._id).lean();
    if(!isEqual(user, req.session.user))
        req.session.user = user;

    res.render('settings', {
        title: 'Settings',
        styles: ['settings.css'],
        scripts: ['settings.js'],
        user: req.session.user,
        helpers: {
            birthdayInput
        }
    });
});

baseRoute.get('/signup', checkNoAuth, (req, res) => {
    res.render('signup', {
        title: 'Create an Account',
        styles: ['signup.css'],
        scripts: ["signup.js"]
    });
});

baseRoute.get('/startdiscussion', checkAuth, (req, res) => {
    res.render('startdiscussion', {
        title: 'Start a discussion',
        styles: ['startdiscussion.css'],
        scripts: ['startdiscussion.js'],
        user: req.session.user,
    });
});

baseRoute.get('/editdiscussion/:id', checkAuth,async(req, res) => {
    const discussion = await Discussion.findById(req.params.id).lean();
    res.render('editdiscussion', {
        title: 'Edit Discussion',
        styles: ['editdiscussion.css'],
        scripts: ['editdiscussion.js'],
        user: req.session.user,
        discussion: discussion
    });
});

baseRoute.get('/forgotpassword', checkNoAuth, (req, res) => {
    res.render('forgotpassword', {
        title: 'Forgot Password',
        styles: ['login.css'],
        scripts: ["forgotpassword.js"]
    });
});

export default baseRoute;