import express from 'express';

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

baseRoute.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        styles: ['login.css'],
        scripts: ['login.js'],
    });
});

baseRoute.get('/home', (req, res) => {
    res.render('index', {
        title: 'Home',
        styles: ['newsfeed.css'],
        scripts: ['newsfeed.js'],
    });
});

baseRoute.get('/profile', (req, res) => {
    res.render('user', {
        title: 'Profile - Porum',
        styles: ['profile.css'],
        scripts: ['profile.js', 'data.js'],
        // isCurrentUser: true
    });
});


baseRoute.get('/settings', (req, res) => {
    res.render('settings', {
        title: 'Settings',
        styles: ['settings.css'],
        scripts: ["data.js"]
    });
});

baseRoute.get('/signup', (req, res) => {
    res.render('signup', {
        title: 'Create an Account - Porum',
        styles: ['signup.css'],
        scripts: ["signup.js"]
    });
});

baseRoute.get('/discussion', (req, res) => {
    res.render('discussion', {
        title: 'Porum',
        styles: ['discussion.css'],
        scripts: ["data.js", "startdiscussion.js"]
    });
});

baseRoute.get('/startdiscussion', (req, res) => {
    res.render('startdiscussion', {
        title: 'Start a discussion - Porum',
        styles: ['startdiscussion.css'],
        scripts: ["data.js", "startdiscussion.js"]
    });
});

baseRoute.get('/editdiscussion', (req, res) => {
    res.render('editdiscussion', {
        title: 'Edit Discussion - Porum',
        styles: ['startdiscussion.css'],
        scripts: ["data.js", "startdiscussion.js"]
    });
});

baseRoute.get('/forgotpassword', (req, res) => {
    res.render('forgotpassword', {
        title: 'Forgot Password - Porum',
        styles: ['login.css'],
        scripts: ["forgotpassword.js"]
    });
});

export default baseRoute;