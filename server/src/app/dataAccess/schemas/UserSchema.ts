const mongoosastic = require('mongoosastic');
const esClient = require('../../../config/elasticsearch/connection')

import mongoose = require('mongoose');


import DataAccess = require('../DataAccess');
import IUserModel = require('../../model/interfaces/UserModel');

let Mongoose = mongoose.Schema;
class UserSchema {

    static get schema() {
        return new Mongoose({
            id: {
                type: String,
                required: false
            },
            firstName: {
                type: String,
                required: true,
                trim: true
            },
            lastName: {
                type: String,
                required: true,
                trim: true
            },
            email: {
                type: String,
                required: true,
                unique: true,
                trim: true
            },
            password: {
                type: String,
                required: true,
                trim: true
            },
            token: {
                type: String,
            },
            salt: {
                type: String
            },
            reset_password_token: {
                type: String
            },
            reset_password_expires: {
                type: Number
            },
            createdAt: { 
                type: Date,
                default: Date.now 
            },
            updatedAt: {
                 type: Date 
            },
            lastLogin: {
                type: Date
            }
        }, {timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'}})
    }
}

UserSchema.schema.pre('save', function(next) {
    console.log('Pre Save Called');
    
    // This middleware will prevent `save()` from executing and go straight
    // to executing the error handling middleware
    // next(new Error('pre save error'));
});

UserSchema.schema.post('save', function(doc, next) {
    console.log('Post Save Called');
    // If this hook is defined _before_ an error handler middleware, this will
    // skip all other non-error-handler post save hooks and execute the next
    // error handler middleware
    // next(new Error('post save error'));
});

  
const handleE11000 = (error, res, next) =>  {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('There was a duplicate key error'));
    } else {
      next();
    }
};

UserSchema.schema.post('save', handleE11000);
UserSchema.schema.post('update', handleE11000);
UserSchema.schema.post('findOneAndUpdate', handleE11000);
UserSchema.schema.post('insertMany', handleE11000);

let User = DataAccess.mongooseConnection.model<IUserModel>("User", UserSchema.schema.plugin(mongoosastic, {
    esClient: esClient
})),
    stream = User.synchronize(),
    count = 0;

stream.on('data', function (err, doc) {
    console.log("--------------doc--------------", doc);
    count++;
});
stream.on('close', function () {
    console.log('close');
    console.log('indexed ' + count + ' documents!');
});
stream.on('error', function (err) {
    console.log("-----------------------Error : -----------------------------", err);
});


export = User;