import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// server modules
import express from 'express';
import exphbs from 'express-handlebars';
import morgan from 'morgan';
import helmet from 'helmet';
// db modules
import mongoose from 'mongoose';
import { connectToServer, getDb }  from './db/conn.js';
// Routers
import baseRoute from './routes/base.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
// Set port
const port = process.env.SERVER_PORT || 3000;
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
// Parse request body as JSON
app.use(express.json());
// Parse request body as URL encoded data
app.use(express.urlencoded({ extended: false }));
// Use helmet
app.use(helmet());
// Use morgan
app.use(morgan("dev"));

// Assign routes
app.use(baseRoute);
app.use("/users",userRoute);
app.use("/auth",authRoute);

// 404 not found page
app.use((req, res, err) => {
    res.render("404", {
        title: "404 Not Found",
        styles: [ "404.css" ],
    });
});

connectToServer( (err) => {
    if (err){
        console.error(err);
        process.exit();
    }
    console.log("Successfully connected to MongoDB...");
    
    app.listen(port, () => {
        console.log("Server now listening on port " + port);
    });

    const db = getDb();

    /* LONG WAY TO CREATE A COLLECTION
    db.createCollection("users",
    (error, collection) =>{
        if (error) {
            console.log("collection creation error");
            return;
        }
        console.log("collection creation successful")
    });*/

    // SHORT WAY TO CREATE A COLLECTION
    // const users = db.collection("users");
    
    // users.insertOne({
    //     firstname: "Harry",
    //     lastname: "Higgins"
    // }).then( result => {
    //     console.log("successful insertOne operation");
    //     console.log(result);
    // }).catch( err => {
    //     console.log("error occured: " + err);
    // });
});

// Stores the user that is currently logged in
var currentUser;

// Fake database (UPDATE!!!) - will now be removed
// (UPDATE!!!) the user below will be converted to MongoDB operation
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

