import IUserModel = require('../model/interfaces/UserModel');
import UserSchema = require('../dataAccess/schemas/UserSchema');
import RepositoryBase = require('./base');

class UserRepository extends RepositoryBase<IUserModel>{
    constructor(){
        super(UserSchema);
    }

    findUserByEmail(email:string, callback:(error: any, result: IUserModel) => void){
        UserSchema.findOne({email},callback);
    }
}
Object.seal(UserRepository);
export = UserRepository;
