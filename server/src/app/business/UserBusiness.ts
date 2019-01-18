import UserRepository = require('../repository/UserRepository');
import IUserBusiness = require('../business/interfaces/UserBusiness');
import IUserModel = require('../model/interfaces/UserModel');

class UserBusiness implements IUserBusiness {
    private _UserRepository: UserRepository;

    constructor() {
        this._UserRepository = new UserRepository();
    }

    create(user: IUserModel, callback: (error:any, result:any) => void) {
        this._UserRepository.create(user,callback);
     }

    retrieve(callback: (error: any, result: any) => void) {
        this._UserRepository.retrieve(callback);
    }

    delete() { }
    update() { }
    findById() { }
}
Object.seal(UserBusiness);
export = UserBusiness;
