import 'dotenv/config';
import { MongoClient } from "mongodb";
import mongoose from 'mongoose';

// Connection URL
const connectionString = process.env.MONGODB_URI + process.env.DB;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
// const client = new MongoClient(connectionString);



export function connectToServer (callback){
    mongoose.connect(connectionString, options, (err) => {
        if(err){
            return callback(err);
        }
        return callback();
    });

    // OLD WAY
    // client.connect().then(( client ) => {
    //     return callback();
    // }).catch( err => {
    //     callback(err);
    // });
}

export function getDb (dbName = process.env.defaultDB){
    return mongoose.connection.useDb(dbName);
};

function signalHandler(){
    console.log("Closing MongoDB connection...");
    mongoose.connection.close();
    // OLD WAY
    // client.close();
    process.exit();
}

process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGQUIT', signalHandler);