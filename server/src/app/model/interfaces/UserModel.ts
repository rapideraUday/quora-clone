import mongoose = require('mongoose');

interface UserModel extends mongoose.Document {

    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    token?: string;
    salt?: string;
    reset_password_token?: string;
    reset_password_expires?: number;
    createdAt?: Date; 
    updatedAt?: Date;
    lastLogin?: Date;
    isVerified?: Boolean;
    verificationToken?: string;
    isAdmin?:Boolean
}

export = UserModel;