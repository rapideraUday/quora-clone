const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const async = require('async');
const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');

import UserRepository = require('../repository/UserRepository');
import IUserBusiness = require('../business/interfaces/UserBusiness');
import IUserModel = require('../model/interfaces/UserModel');

const MailerEmail = process.env.MAILER_EMAIL_ID || 'not defined';
const pass = process.env.MAILER_PASSWORD || 'not defined';

interface Ihash {
    password: string;
    salt: string;
}

class UserBusiness implements IUserBusiness {
    private _UserRepository: UserRepository;
    saltLength: number = 10;
    smtpTransport = nodemailer.createTransport({
        service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
        auth: {
            user: MailerEmail,
            pass: pass
        }
    });
    handlebarsOptions = {
        viewEngine: 'handlebars',
        viewPath: path.resolve('./src/templates'),
        extName: '.html'
    };

    constructor() {
        this._UserRepository = new UserRepository();
    }

    create(user: IUserModel, callback: (error: any, result: any) => void) {
        const hash = this.saltHashPassword(user.password);
        user.password = hash.password;
        user.salt = hash.salt;
        this._UserRepository.create(user, callback);
    }

    login(email: string, password: string, callback: (error: any, result: any) => void) {
        async.waterfall([
            (done) => {
                this._UserRepository.findUserByEmail(email, (error, result) => {
                    if (result) {
                        const userPassword: Ihash = this.hashPasswordWithSalt(password, result.salt);
                        if (result.password === userPassword.password) {
                            const payload = { _id: result._id };
                            const options = { expiresIn: '1d', issuer: 'quora-clone' };
                            const secret = process.env.JWT_SECRET;
                            const token = jwt.sign(payload, secret, options);
                            const userDetail: IUserModel = {
                                _id: result._id,
                                firstName: result.firstName,
                                lastName: result.lastName,
                                email: result.email,
                                password: result.password,
                                salt: result.salt,
                                token: token
                            }
                            return done(null, userDetail);
                        }
                        return done('Wrong Password', null);
                    }
                    return done("User not found", null);
                });
            },
            (userDetail, done) => {
                this._UserRepository.update(userDetail._id, userDetail, (error, result) => {
                    if (error) {
                        return done('Internal Server Error', null);
                    }
                    return done(null, userDetail.token);
                })
            }
        ], (err, result) => {
            if (err) return callback(err, null);
            return callback(null, result);
        });
    }

    retrieve(callback: (error: any, result: any) => void) {
        this._UserRepository.retrieve(callback);
    }

    findByToken(token: string, callback: (error: any, result: any) => void) {
        this._UserRepository.findByToken(token, callback);
    }

    logout(_id: string, callback: (error: any, result: any) => void) {
        this._UserRepository.logout(_id, callback);
    }

    delete() { }

    update(_id: string, item: IUserModel, callback: (error: any, result: any) => void) {


        this._UserRepository.update(_id, item, callback);

    }
    updateAll(lastName: string, item: IUserModel, callback: (error: any, result: any) => void) {
        this._UserRepository.updateAll(lastName, item, (err, result) => {
            if (err) return callback(err, null);
            let updateData = [];
            const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
            const asyncForEach = async (array, cb) => {
                for (let index = 0; index < array.length; index++) {
                    await cb(array[index], index, array)
                }
            }

            const start = async () => {
                await asyncForEach(result, async (id) => {
                    await waitFor(50)
                    this.update(id, item, (err, res) => {
                        if (err) return callback(err, null)
                        updateData.push(res)
                    })

                })
                callback(null, updateData);
            }
            start()
        });
    }

    smtpWithOptions(){
        return this.smtpTransport.use('compile', hbs(this.handlebarsOptions));
    }

    forgotPassword(email: string, callback: (error: any, result: any) => void) {
        this.smtpWithOptions();
        async.waterfall([
            (done) => {
                this._UserRepository.findOne({ email }, (err, user) => {

                    if (user) {
                        done(err, user);
                    } else {
                        done('User not found.');
                    }
                })
            },
            (user, done) => {
                // create the random token
                crypto.randomBytes(20, (err, buffer) => {
                    const token = buffer.toString('hex');
                    done(err, user, token);
                });
            },
            (user, token, done) => {
                const updateData = {
                    reset_password_token: token,
                    reset_password_expires: Date.now() + 86400000
                }
                this.update(user._id, updateData, (err, new_user) => {
                    done(err, token, new_user);
                });

            },
            (token, user, done) => {
                const data = {
                    to: user.email,
                    from: MailerEmail,
                    template: 'forgot-password-email',
                    subject: 'Password help has arrived!',
                    context: {
                        url: 'http://localhost:3000/api/v1/auth/reset_password?token=' + token,
                        name: user.firstName.split(' ')[0]
                    }
                };

                this.smtpTransport.sendMail(data, (err) => {
                    if (!err) {
                        return callback(null, 'Kindly check your email for further instructions');
                    } else {
                        return done(err);
                    }
                });
            }
        ], (err) => {
            // return res.status(422).json({ message: err });
            return callback(err, null);
        });

    }

    resetPassword(newPassword: string, verifyPassword: string, token: string, callback: (error: any, result: any) => void) {
        this.smtpWithOptions();
        this._UserRepository.findResetPasswordToken(token, (err, user) => {
            if (err) return callback(err, null);
            if (!err && user) {
                if (newPassword === verifyPassword) {
                    user.hash_password = this.saltHashPassword(newPassword);
                    user.reset_password_token = undefined;
                    user.reset_password_expires = undefined;
                    user.save( (err) => {
                        if (err) {
                            callback(err, null);
                        } else {
                            var data = {
                                to: user.email,
                                from: MailerEmail,
                                template: 'reset-password-email',
                                subject: 'Password Reset Confirmation',
                                context: {
                                    name: user.firstName.split(' ')[0]
                                }
                            };

                            this.smtpTransport.sendMail(data, (err) => {
                                if (!err) {
                                    return callback(null, 'Password Successfully reset. Kindly check your email for further instructions');
                                } else {
                                    return callback(err, null)
                                }
                            });
                        }
                    });
                } else {
                    return callback('Passwords do not match',null )
                }
            } else {
                return callback('Password reset token is invalid or has expired.',null )
            }
        })
    }


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
