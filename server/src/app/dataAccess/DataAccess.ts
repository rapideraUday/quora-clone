import Mongoose = require('mongoose');
import Constants = require('./../../config/constants');
console.log('mongoose version:', Mongoose.version);
Mongoose.Promise = Promise;
class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;

    constructor() {
        DataAccess.connect();
    }

    static connect(): Mongoose.Connection {
        if (this.mongooseInstance) return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        
        this.mongooseInstance = Mongoose.connect(Constants.DB_CONNECTION_STRING, { useNewUrlParser: true });

        this.mongooseConnection.once("open", () => {
            console.log("Ready to Operate");
        });

        Mongoose.connection.on('connected', () => {
            console.log('Successfully connected: DBURL----' + Constants.DB_CONNECTION_STRING);
        });

        Mongoose.connection.on('error', (err) =>{
            console.log('Mongoose connection error: ' + err);
        });

        Mongoose.connection.on('disconnected', () => { 
            console.log('-> lost connection'); 
        });

        Mongoose.connection.on('reconnect', () => { 
            console.log('-> reconnected'); 
        });

        Mongoose.connection.on('reconnectFailed', () => { 
            console.log('-> gave up reconnecting'); 
        });


        process.on('SIGINT', () => {
            Mongoose.connection.on('close', () => {
                console.log('Mongoose disconnected through app termination');
                process.exit(0);
            });
        });

        process.on('uncaughtException',(exception) => {
            console.log("uncaughtException: ------",exception);
        })
        return this.mongooseInstance;
    }
}

DataAccess.connect();
export = DataAccess;



