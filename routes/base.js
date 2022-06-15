import express from 'express';

const baseRoute = express.Router();


baseRoute.get('/newsfeed', (req, res) => {
    res.redirect('/home');
});

baseRoute.get('/home', (req, res) => {
    res.render('index', {
        title: 'Newsfeed',
        styles: ['newsfeed.css'],
        scripts: ['newsfeed.js'],
    });
});

baseRoute.get('/user', (req, res) => {
    res.render('user', {
        title: 'Newsfeed',
        styles: ['newsfeed.css'],
        isCurrentUser: true
    });
});


// baseRoute.get('/home', (req, res) => {
//     res.render("index", {
//         title: "homepage",
//         name: "Jimmy"
//     });
// });

// baseRoute.get("/list", (req, res) => {
//     res.render("list", {
//         title: "list",
//         items: [
//             { firstname: "John", lastname: "Smith" },
//             { firstname: "Bob", lastname: "Morris" },
//             { firstname: "Zark", lastname: "Muckerberg" }
//         ]
//     });
// });

// baseRoute.get("/yell", (req, res) => {
//     var platform = req.get('sec-ch-ua-platform');
    
//     res.render("yell", {
//         title: "YELL",
//         message: 'you are on '+ platform,
//         helpers: {
//             loud(text, options) { return text.toUpperCase(); }
//         }
//     });
// });

// baseRoute.get("/if", (req, res) => {
//     res.render("if", {
//         title: "If sample",
//         showWeather: false,
//         showTime: true,
//         helpers: {
//             date() { return new Date().toDateString(); }
//         }
//     });
// })

export default baseRoute;