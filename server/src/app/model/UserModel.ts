import IUserModel = require('./interfaces/UserModel');

class UserModel{
    private _userModel: IUserModel;

    constructor(private userModel: IUserModel){
        this._userModel = userModel;
    }

    get firstName(): string{
        return this._userModel.firstName;
    }

    get lastName(): string{
        return this._userModel.lastName;
    }

    get email(): string{
        return this._userModel.email;
    }
    get password(): string{
        return this._userModel.password;
    }
}

Object.seal(UserModel);
export = UserModel;