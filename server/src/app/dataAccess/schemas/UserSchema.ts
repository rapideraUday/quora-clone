import DataAccess = require('../DataAccess');
import IUserModel = require('../../model/interfaces/UserModel');

class UserSchema {

    static get schema() {
        return DataAccess.mongooseInstance.Schema({
            id: {
                type: String,
                required: false
            },
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            token:{
                type:String,
            },
            salt:{
                type:String
            }
        })
    }
}

var schema = DataAccess.mongooseConnection.model<IUserModel>("Users", UserSchema.schema);
export = schema;