import express from 'express';
import Discussion from '../db/models/Discussion.js';
import User from '../db/models/User.js';
import { checkAuth, checkNoAuth } from './auth.js';
import { calcDate, formatDate, truncate } from './utils.js';

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
    const discussions = await Discussion.find({}).lean();
    for(var discussion of discussions){
        discussion.author = await User.findOne({ _id: discussion.userId }).select("username profileImg").lean();
        // for(var comment of discussion.comments){
        //     comment.author = await User.findOne({ _id: comment.userId }).select("username profileImg").lean();
        // }
        //console.log(discussion);
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

    res.render('user', {
        title: 'Profile',
        styles: ['profile.css'],
        scripts: ['profile.js'],
        user: req.session.user,
        discussions: discussions,
        isCurrentUser: true,
        helpers: {
            calcDate, formatDate, truncate
        }
    });
});


baseRoute.get('/settings', checkAuth, (req, res) => {
    res.render('settings', {
        title: 'Settings',
        styles: ['settings.css'],
        scripts: ['settings.js']
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

baseRoute.get('/editdiscussion', checkAuth, (req, res) => {
    res.render('editdiscussion', {
        title: 'Edit Discussion',
        styles: ['startdiscussion.css'],
        scripts: ['startdiscussion.js'],
        user: req.session.user,
    });
});

baseRoute.get('/forgotpassword', checkNoAuth, (req, res) => {
    res.render('forgotpassword', {
        title: 'Forgot Password',
        styles: ['login.css'],
        scripts: ["forgotpassword.js"]
    });
});

baseRoute.get('/discussion', checkAuth, (req, res) => {
    res.render('discussion', {
        title: 'Porum',
        styles: ['startdiscussion.css'],
        scripts: ["startdiscussion.js"]
    });
});

export default baseRoute;