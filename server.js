import 'dotenv/config';
import { connectToMongo, getDb } from './db/conn.js';
import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set port
const port = 8080;
// Set static folder
app.use(express.static(path.join(__dirname,"/public")));
// Set handlebars as the app's view engine.
// `{extname: 'hbs'}` informs the handlebars engine that the file extension to read is .hbs 
app.engine("hbs", exphbs.engine({extname: 'hbs'}));
// Set express' default file extension for views as .hbs
app.set("view engine", "hbs");
// Set the directory for the views
app.set("views", "./views");
// Set view cache to false so browsers wouldn't save views into their cache
app.set("view cache", false);

connectToMongo( (err) => {
    if (err){
        console.log("error occured");
        console.err(err);
        process.exit();
    }

    console.log("Successfully connected to MongoDB...");

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
    const users = db.collection("users");
    
    users.insertOne({
        firstname: "Harry",
        lastname: "Higgins"
    }).then( result => {
        console.log("successful insertOne operation");
        console.log(result);
    }).catch( err => {
        console.log("error occured: " + err);
    });
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


app.listen(port, () => {
    console.log("Server now listening on port " + port);
});