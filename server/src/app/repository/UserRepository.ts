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
        var query = UserSchema.find({lastName:lastName}).select({ "_id": 1});
        query.exec((err, docs) => {
            if(err) return callback(err, null);
            console.log(docs);
            return callback(null, docs);
            
        })
        // UserSchema.updateMany({lastName:lastName},item,{ new: true} ,callback);
        // UserSchema.updateMany(
        //     { lastName: lastName },
        //     { $set: item },
        //     { upsert: true },
        //     callback);
        // UserSchema.find({}, (err, docs) => {
        //     res.status(200).json(docs)
        //     console.log(docs);

        // })

        // var query = UserSchema.find({lastName:lastName}).select({ "_id": 1})
        // .then(function(matchingIds) {
        //     lastName = {_id: {$in: matchingIds}}
        //     return UserSchema.updateMany({lastName:lastName}, item)
        //   }).then(function() {
        //     return UserSchema.find(lastName)
        //   },callback)    

        //   console.log(query);
          

        // query.exec(function (err, someValue) {
        //     // if (err) return next(err);
        //     // res.send(someValue);
        //         // someValue.then(function(matchingIds) {
        //         //     lastName = {_id: {$in: matchingIds}}
        //         //     console.log(UserSchema.updateMany({lastName:lastName}, item));
                    
        //         //     return UserSchema.updateMany({lastName:lastName}, item)
        //         //   }).then(function() {
        //         //     console.log(UserSchema.find(lastName));
        //         //     return UserSchema.find(lastName)
        //         //   })
        //         console.log(someValue);
                
            
        // });



    }

    // findAndUpdateMany(lastName, updateOptions) {
    //     return UserSchema.find(filter).project({_id: 1}).toArray()
    //     .then(function(matchingIds) {
    //       filter = {_id: {$in: matchingIds}}
    //       return collection.updateMany(filter, updateOptions)
    //     }).then(function() {
    //       return collection.find(filter).toArray()
    //     })



    // }
}
Object.seal(UserRepository);
export = UserRepository;
