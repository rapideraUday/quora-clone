import DataAccess = require('../DataAccess');
import IUserModel = require('../../model/interfaces/UserModel');

class UserSchema {

    static get schema() {
        return DataAccess.mongooseInstance.Schema({
            id: {
                type: String,
                required: false
            },
            section: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            marks: {
                type: Number,
                required: true
            }
        })
    }
}

var schema = DataAccess.mongooseConnection.model<IUserModel>("Users", UserSchema.schema);
export = schema;