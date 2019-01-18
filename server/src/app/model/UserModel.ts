import IUserModel = require('./interfaces/UserModel');

class UserModel{
    private _userModel: IUserModel;

    constructor(private userModel: IUserModel){
        this._userModel = userModel;
    }

    get name(): string{
        return this._userModel.name;
    }

    get section(): string{
        return this._userModel.section;
    }

    get marks(): number{
        return this._userModel.marks;
    }
}

Object.seal(UserModel);
export = UserModel;