import IUserModel = require('../model/interfaces/UserModel');
import UserSchema = require('../dataAccess/schemas/UserSchema');
import RepositoryBase = require('./base');

class UserRepository extends RepositoryBase<IUserModel>{
    constructor(){
        super(UserSchema);
    }
    // findById (_id: string, callback: (error: any, result: T) => void) {
    //     this._model.findById( _id, callback);
    // }

    findUserByEmail(email:string, callback:(error: any, result: IUserModel) => void){
        UserSchema.findOne({email},callback);
    }
}
Object.seal(UserRepository);
export = UserRepository;
