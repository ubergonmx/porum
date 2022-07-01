# Porum
Major Course Output of Group 12 (S15) for CCAPDEV2122T2

## Introduction
Since we are social beings, the global pandemic has had a significant impact on our social lives as it continues to limit our face-to-face interactions and isolate us from the rest of the world. 

As a result, many of us want to share our experiences with the internet, which has served as the primary mode of communication during the pandemic. There are many social media platforms that people can use as a result of this, but only a few community-based platforms where people can post various information or contents.

Herewith, the proposed web application is an online forum similar to Reddit and StackOverflow, that will allow registered users to create posts from queries, news, thoughts or to simply share something of their interest. With this, other users can comment and react to these posts which will promote interaction and communication between the users of the web application making it more user-friendly.

## Local Set Up
- Make sure MongoDB is installed and running.
- Run `npm install`
- Rename the `.env.default` file to `.env`
    - Set up `MONGODB_URI` if connection problems occur
- To run the application, execute `node server.js` or `npm start`

## Content
- [`db`](db) - This folder contains files which defines database models, connection, and sample data.
- [`utils`](utils) - This folder contains js files used for utilities
- [`models`](models) - This folder contains files for database modeling and access.
- [`public`](public) - This folder contains static assets such as css, js, and image files.
- [`routes`](routes) - This folder contains files which describes the response of the server for each HTTP method request to a specific path in the server.
- [`views`](views) - This folder contains all hbs files to be rendered when requested from the server.
- [`server.js`](server.js) - The main entry point of the web application.

## Challenge Description
You are to create a web application which simulates an online payment transaction tracker.

When a client requests for the root path, i.e. `/`, the server should display [`views/index.hbs`](views/index.hbs). Your web browser should display the screen below:
![alt text](misc/index.png "Index Page")

The web application accepts three inputs - a name, a reference number, and an amount. When the user submits the form, the web application first checks if all fields are filled. Sample user input:
![alt text](misc/filled-up-form.png "Filled Form")

Upon clicking the submit button, if at least one of the form fields is not filled-up, display the error message `Fill up all fields`. No need to highlight the fields.

The picture below shows the error message when at least one of the form fields is not filled-up:
![alt text](misc/no-input.png "No input")

The web application then saves the values in the database, then display the values in [`views/index.hbs`](views/index.hbs). Use [`views/partials/card.hbs`](views/partials/card.hbs) to render the `<div>` for each transaction. Upon submitting the form, the transaction should be displayed immediately **without refreshing the page**. Upon submitting the form, the fields must be emptied.

**HINT:** the client should communicate with the server asynchronously, thus data must be **fetched** from the server.

**HINT:** The server can render the handlebars template and send the rendered HTML partial. See the [express documentation on `res.render`](https://expressjs.com/en/api.html#res.render) to know more.

The picture below shows how the web application should display the values that we have entered earlier:
![alt text](misc/displayed-transaction.png "Displayed Transaction")

Each transaction may be removed using the `X` button on the upper right of the `<div>`. Upon clicking the `X` button, the web application deletes the transaction from the database, then removes the corresponding `<div>` of the transaction from [`views/index.hbs`](views/index.hbs). This operation should be done **without refreshing the page**.

Note that the reference number should be [**UNIQUE**](https://mongoosejs.com/docs/schematypes.html#schematype-options) for each transaction - no two transactions may have the same reference number. Thus, you are required to check if the current value entered by the user in the `refno` text field has not yet been used by any other transaction in the database. You need to check this **EVERY TIME** the user enters a number in the `refno` text field.

If the current value in the `refno` text field **IS IN THE DATABASE**:
- Change the background color of the `refno` text field to `red`.
- Display the error message `Reference number already in the database` in the `<p id="error">` element in [`views/index.hbs`](views/index.hbs).
- Disable the `submit` button.

Else, if the current value in the `refno` text field **IS NOT YET IN THE DATABASE**:
- Change the background color of the `refno` text field back to `#E3E3E3`
- Remove the error message in the `<p id="error">` element in [`views/index.hbs`](views/index.hbs).
- Enable the `submit` button.

The picture below shows the changes in the form if the current value in the `refno` text field is already in the database:
![alt text](misc/error.png "Error")

If ever we refresh the web application, all transactions in the database should be displayed.

You are already provided with the skeleton code organized in the MVC architecture. Your task is to study the web application and complete the code of the files below. You are **not encouraged** to modify other files except the files below. Editable parts of code are marked with `TODO` comments, where you can insert your code.
- [`controllers/controller.js`](controllers/controller.js)
- [`models/TransactionModel.js`](models/TransactionModel.js)
- [`public/js/index.js`](public/js/index.js)
- [`views/index.hbs`](views/index.hbs)

If you wish to proceed with a different implementation, make sure that the specification requirements are exactly met and that the intended UI is unchanged.
Goodluck and stay safe! :sunglasses:

## References
Maximize the materials uploaded for class and the resources readily available on the internet.

* [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) documentation
* [Mongoose SchemaTypes](https://mongoosejs.com/docs/schematypes.html) documentation
* [ccapdev-mongoose](https://github.com/arvention/ccapdev-mongoose) code sample


## Languages and Tools
<p align="left"> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://handlebarsjs.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/handlebars/handlebars-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a>
</p>