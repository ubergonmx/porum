const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

// Set port
const port = 8080;
// Set static folder
app.use(express.static(__dirname + "/public"));
// Set handlebars as the app's view engine.
// `{extname: 'hbs'}` informs the handlebars engine that the file extension to read is .hbs 
app.engine("hbs", exphbs.engine({extname: 'hbs'}));
// Set express' default file extension for views as .hbs
app.set("view engine", "hbs");
// Set the directory for the views
app.set("views", "./views");
// Set view cache to false so browsers wouldn't save views into their cache
app.set("view cache", false);

// Stores the user that is currently logged in
var currentUser;


// Fake database
var db = [
    new user(
        "harry31",
        "harry.higgins@test.com",
        "asd123",
        "images/user/user1.jpg",
        new info(
            "Harry",
            "Higgins",
            new Date(2001, 2, 27),
        )
    )
];

function user(username, email, password, imgSrc, info){
    return {
        username: username,
        email: email,
        password: password,
        imgSrc: imgSrc,
        info: info,
    }
}

function info(firstname, lastname, birthday=0, phoneNumber=0){
    return {
        firstname: firstname,
        lastname: lastname,
        birthday: birthday,
        phoneNumber: phoneNumber,
    }
}

app.get('/', (req, res) => {

    if(currentUser == undefined || currentUser == 0){
        res.redirect('/login');
    }
    else{
        res.render("index", {
            title: "homepage",
            name: "Jimmy"
        });
    }
});


app.listen(port, () => {
    console.log("Server now listening on port " + port);
});