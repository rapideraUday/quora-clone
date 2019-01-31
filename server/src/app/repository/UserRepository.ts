import IUserModel = require('../model/interfaces/UserModel');
import UserSchema = require('../dataAccess/schemas/UserSchema');
import RepositoryBase = require('./base');
import mongoose = require("mongoose");


class UserRepository extends RepositoryBase<IUserModel>{
    constructor() {
        super(UserSchema);
    }
    findUserByEmail(email: string, callback: (error: any, result: IUserModel) => void) {
        UserSchema.findOne({ email }, callback);
    }
    findByToken(token: string, callback: (error: any, result: IUserModel) => void) {
        UserSchema.findOne({ token }, callback);

    }
    logout(_id: mongoose.Types.ObjectId, callback: (error: any, result: IUserModel) => void) {
        UserSchema.update({ _id: _id }, { $unset: { token: 1 } }, callback);
    }
    updateAll(lastName: any, item: IUserModel, callback: (error: any, result: any) => void) {
        var query = UserSchema.find({ lastName: lastName }).select({ "_id": 1 });
        query.exec((err, docs) => {
            if(!docs || docs.length === 0) return callback('No record found', null);
            if (err) return callback(err, null);
            return callback(null, docs);
        })
    }
    findOne(item: Object, callback: (error: any, result: any) => void) {
        var query = UserSchema.findOne(item);
        query.exec((err, docs) => {
            console.log("docs",docs);
            
            if(!docs || docs.length === 0) return callback('No record found', null);
            if (err) return callback(err, null);
            return callback(null, docs);
        })
    }

    findResetPasswordToken(token: string, callback: (error: any, result: any) => void){
        var query = UserSchema.findOne({
            reset_password_token: token,
            reset_password_expires: {
              $gt: Date.now()
            }
          });
          query.exec((err, docs) => {
            if(err) return callback(err, null);
            if(!docs || docs.length === 0) return callback('No record found', null);
            return callback(null, docs);    
        })
    }
}
Object.seal(UserRepository);
export = UserRepository;
    