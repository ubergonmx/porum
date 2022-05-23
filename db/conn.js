import { MongoClient } from "mongodb";
import 'dotenv/config';

const client = new MongoClient(process.env.MONGODB_URI);

export function connectToMongo (callback){
    client.connect().then(( client ) => {
        return callback();
    }).catch( err => {
        callback(err);
    });
}

//users is the database name by default
export function getDb (dbName = process.env.defaultDB){
    return client.db(dbName);
};

function signalHandler(){
    console.log("Closing MongoDB connection...");
    client.close();
    process.exit();
}

process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGQUIT', signalHandler);