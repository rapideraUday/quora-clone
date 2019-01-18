const crypto = require('crypto');

import UserRepository = require('../repository/UserRepository');
import IUserBusiness = require('../business/interfaces/UserBusiness');
import IUserModel = require('../model/interfaces/UserModel');

interface Ihash {
    password: string;
    salt: string;
}

class UserBusiness implements IUserBusiness {
    saltLength: number = 10;

    private _UserRepository: UserRepository;

    constructor() {
        this._UserRepository = new UserRepository();
    }

    create(user: IUserModel, callback: (error: any, result: any) => void) {
        const hash = this.saltHashPassword(user.password);
        user.password = hash.password;
        user.salt = hash.salt;
        this._UserRepository.create(user, callback);
    }

    login(email: string, password: string, callback: (error: any, result: any) => void){
        let isMatch:Boolean = false;
        this._UserRepository.findUserByEmail(email,(error,result) => {
            if(result){
                const userPassword:Ihash = this.hashPasswordWithSalt(password,result.salt);
                if(result.password === userPassword.password){
                    isMatch = true;
                    return callback(null,isMatch);
                }
                return callback('Wrong Password',null);
            }
            return callback("User not found", null);
        });
    }

    retrieve(callback: (error: any, result: any) => void) {
        this._UserRepository.retrieve(callback);
    }

    delete() { }
    update() { }
    findById() { }

    saltHashPassword(password: string): Ihash {
        const salt: string = this.getSalt();
        return this.hashPasswordWithSalt(password, salt);
    }

    getSalt(): string {
        return crypto.randomBytes(this.saltLength).toString('Hex');
    }

    hashPasswordWithSalt(password: string, salt: string): Ihash {

        let hashedPassword = crypto.createHmac('sha512', salt);
        hashedPassword.update(password);
        hashedPassword = hashedPassword.digest('Hex');
        const encryptedValues: Ihash = {
            salt: salt,
            password: hashedPassword
        };
        return encryptedValues;
    }
}

Object.seal(UserBusiness);
export = UserBusiness;
