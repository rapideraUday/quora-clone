const mongoosastic = require('mongoosastic');
const esClient = require('../../../config/elasticsearch/connection')

import mongoose = require('mongoose');

import DataAccess = require('../DataAccess');
import IUserModel = require('../../model/interfaces/UserModel');

class UserSchema {

    static get schema() {
        return mongoose.Schema({
            id: {
                type: String,
                required: false
            },
            firstName: {
                type: String,
                required: true,
                trim:true
            },
            lastName: {
                type: String,
                required: true,
                trim:true
            },
            email: {
                type: String,
                required: true,
                unique : true,
                trim:true
            },
            password: {
                type: String,
                required: true,
                trim:true
            },
            token:{
                type:String,
            },
            salt:{
                type:String
            }
        }).plugin(mongoosastic,{
            esClient: esClient
        });
    }
}

let User = DataAccess.mongooseConnection.model<IUserModel>("Users", UserSchema.schema),
stream =   User.synchronize(),
           count = 0;
           
            stream.on('data', function (err, doc) {
                console.log('data',doc);
                
                count++;
              });
              stream.on('close', function () {
                console.log('close');
                
                console.log('indexed ' + count + ' documents!');
              });
              stream.on('error', function (err) {
                console.log(err);
                
                console.log(err);
              });


export = User;