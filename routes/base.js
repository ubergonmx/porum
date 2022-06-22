import express from 'express';
import Discussion from '../db/models/Discussion.js';
import User from '../db/models/User.js';
import { checkAuth, checkNoAuth } from './auth.js';

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
        var commenters = {};
        for(var comment of discussion.comments){
            comment.author = await User.findOne({ _id: comment.userId }).select("username profileImg").lean();
        }
        console.log(discussion);
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
            calcDate,
        }
    });
});


baseRoute.get('/settings', checkAuth, (req, res) => {
    res.render('settings', {
        title: 'Settings',
        styles: ['settings.css'],
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
        scripts: ["startdiscussion.js"],
        user: req.session.user,
    });
});

baseRoute.get('/editdiscussion', checkAuth, (req, res) => {
    res.render('editdiscussion', {
        title: 'Edit Discussion',
        styles: ['startdiscussion.css'],
        scripts: ["startdiscussion.js"],
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
/**
 * This calculates the time difference between the actual date posted and today
 * @param  {Date} datePosted
 */
 function calcDate(datePosted){
    const dateToday = new Date();
    const year = dateToday.getFullYear() - datePosted.getFullYear()
    const month = monthDiff(datePosted, dateToday);
    const day = dayDiff(datePosted, dateToday);
    const hour = hourDiff(datePosted, dateToday);
    const minute = minuteDiff(datePosted, dateToday);
    const second = secondDiff(datePosted, dateToday);
    //console.log(`${dateToday.toISOString().slice(0, 10)} - ${datePosted.toISOString().slice(0, 10)}:\n ${year} ${month} ${day} ${hour} ${minute} ${second} `);


    if(year != 0)
        return `${year} year${year > 1 ? 's': ''} ago`;
    if(month != 0)
        return `${month} month${month > 1 ? 's': ''} ago`;
    if(day != 0)
        return `${day} day${day > 1 ? 's': ''} ago`;
    if(hour != 0)
        return `${hour} hour${hour > 1 ? 's': ''} ago`;
    if(minute != 0)
        return `${minute} minute${minute > 1 ? 's': ''} ago`;
    
    return `${second} second${year > 1 ? 's': ''} ago`;
}
/**
 * Returns the month difference
 * @param  {Date} date1 - the date before date 2
 * @param  {Date} date2 - the latest/recent date
 */
function monthDiff(date1, date2) {
    var months;
    months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();
    return months <= 0 ? 0 : months;
}

/**
 * Returns the day difference between two dates
 * @param  {Date} date1 - the date before date 2
 * @param  {Date} date2 - the latest/recent date
 */
function dayDiff(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

/**
 * Returns the hour difference between two dates
 * @param  {Date} date1 - the date before date 2
 * @param  {Date} date2 - the latest/recent date
 */
function hourDiff(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60 * 60));
}

/**
 * Returns the minute difference between two dates
 * @param  {Date} date1 - the date before date 2
 * @param  {Date} date2 - the latest/recent date
 */
function minuteDiff(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60));
}

/**
 * Returns the seconds difference between two dates
 * @param  {Date} date1 - the date before date 2
 * @param  {Date} date2 - the latest/recent date
 */
function secondDiff(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / 1000);
}

/**
 * Returns the string with length n with ellipsis on
 * the end  * By default, it returns the string without
 * cutting the word.
 * @param  {string} str
 * @param  {int} n=170
 * @param  {boolean} useWordBoundary=1
 */
 function truncate( str, n = 170, useWordBoundary = 1 ){
    if (str.length <= n) { return str; }
    const subString = str.substr(0, n-1); // the original check
    return (useWordBoundary 
      ? subString.substr(0, subString.lastIndexOf(" ")) 
      : subString) + "&hellip;";
};


export default baseRoute;