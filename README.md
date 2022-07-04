# Porum
Major Course Output of Group 12 (S15) for CCAPDEV2122T2

## Introduction
Since we are social beings, the global pandemic has had a significant impact on our social lives as it continues to limit our face-to-face interactions and isolate us from the rest of the world. 

As a result, many of us want to share our experiences with the internet, which has served as the primary mode of communication during the pandemic. There are many social media platforms that people can use as a result of this, but only a few community-based platforms where people can post various information or contents.

Herewith, the proposed web application is an online forum similar to Reddit and StackOverflow, that will allow registered users to create posts from queries, news, thoughts or to simply share something of their interest. With this, other users can comment and react to these posts which will promote interaction and communication between the users of the web application making it more user-friendly.

## Local Set Up
- Make sure MongoDB is installed and running.
- Run `npm install`.
- Rename the `.env.default` file to `.env`.
    - Set up `MONGODB_URI` if connection problems occur.
- To run the application, execute `node server.js` or `npm start`
- To access the application, go to the `localhost:port` link with port based on the `SERVER_PORT` environment variable.
    - By default, the link is `http://localhost:3000/`.

## Content
- [`db`](db) - This folder contains files which defines database connection, models, and sample data.
- [`utils`](utils) - This folder contains js files used as helper functions.
- [`models`](models) - This folder contains files for database modeling and access.
- [`public`](public) - This folder contains static assets such as css, js, and image files.
- [`routes`](routes) - This folder contains files which describes the response of the server for each HTTP method request to a specific path in the server.
- [`views`](views) - This folder contains all hbs files to be rendered when requested from the server.
- [`server.js`](server.js) - The main entry point of the web application.

## Languages and Tools
<p align="left"> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://handlebarsjs.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/handlebars/handlebars-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a>
</p>

## Installed NPM Packages
- [bcrypt](https://www.npmjs.com/package/bcrypt) - This package is used to hash passwords.
- [body-parser](https://www.npmjs.com/package/body-parser) - This package parses incoming request bodies before the handlers, available under the req.body property.
- [dotenv](https://www.npmjs.com/package/dotenv) - This package is the module that loads environment variables from a .env file into `process.env`.
- [express](https://www.npmjs.com/package/express) - This package is the web framework of this project which provides broad features for building web and mobile applications.
- [express-csp-header](https://www.npmjs.com/package/express-csp-header) - This package is a Content-Security-Policy middleware used to allow specified scripts (such as FontAwesome).
- [express-handlebars](https://www.npmjs.com/package/express-handlebars) - This package is a view engine for express which is used as the templating engine for this project. 
- [express-session](https://www.npmjs.com/package/express-session) - This package is a session middleware used to store session data such as the logged in user.
- [helmet](https://www.npmjs.com/package/helmet) - This package is used to help secure the application by setting various HTTP headers.
- [mongodb](https://www.npmjs.com/package/mongodb) - This package is the MongoDB driver for Node.js.
- [mongoose](https://www.npmjs.com/package/mongoose) - This package is an object modelling tool for MongoDB.
- [morgan](https://www.npmjs.com/package/morgan) - This package is a HTTP middleware for Node.js that logs HTTP requests and errors.
- [multer](https://www.npmjs.com/package/multer) - This package is a node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files.
- [nodemailer](https://www.npmjs.com/package/nodemailer) - This package allows sending emails from Node.js.
- [nodemon](https://www.npmjs.com/package/nodemon) - This package helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
