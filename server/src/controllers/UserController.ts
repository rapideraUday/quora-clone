import express = require('express');
import path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

import IBaseController = require('./interfaces/base');
import UserBusiness = require('../app/business/UserBusiness')
import IUserModel = require('../app/model/interfaces/UserModel');
import { IResponseFormat } from './interfaces/common/ResponseFormat';
import Utility from './_helper/utility';
import ElasticInfo from '../config/elasticsearch/info';
import ElasticSearchOperations from '../config/elasticsearch/operations';

const MailerEmail = process.env.MAILER_EMAIL_ID || 'not defined';
const MailerPassword = process.env.MAILER_PASSWORD || 'not defined';

const User = require('../app/dataAccess/schemas/UserSchema')

// var inputfile = require("./dummydata.json");

import DummyData from './_helper/dummydata';

class UserController implements IBaseController<UserBusiness>{
    private _responseFormat: IResponseFormat;

    smtpTransport = nodemailer.createTransport({
        service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
        auth: {
            user: MailerEmail,
            pass: MailerPassword
        }
    });

    /**
     * @api $BASE_URL/user
     * @description Api for creating new user
     * @param request 
     * @param response 
     */
    create(request: express.Request, response: express.Response): void {
        try {
            const user: IUserModel = <IUserModel>request.body;
            const userBusiness = new UserBusiness();
            userBusiness.create(user, (error, result) => {
                if (error) {
                    response.status(500).send(Utility.generateResponse(404, error, false, null))
                }
                if(result){
                    result.verificationToken = crypto.randomBytes(16).toString('hex');
                    User.findByIdAndUpdate(result._id,{$set:result}, function(err, result){
                        if(err){
                            console.log(err);
                        }
                        console.log("RESULT: " + result);
                    });
                }
                if (result.verificationToken) {
                    const mailOptions = {
                        from: MailerEmail,
                        to: user.email,
                        subject: 'Account Verification Token',
                        text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + request.headers.host + '\/api\/v1\/confirmation\/' + result.verificationToken + '.\n'
                    };
                    const smtpTransport = nodemailer.createTransport({
                        service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
                        auth: {
                            user: MailerEmail,
                            pass: MailerPassword
                        }
                    });
                    console.log(this);
                    smtpTransport.sendMail(mailOptions, (err) => {
                        if (err) {
                            response.status(500).send(Utility.generateResponse(404, 'Not able send Verification email', false, null))
                        }
                        response.status(200).send(Utility.generateResponse(200, `A verification email has been sent to ${user.email}.`, true, result));
                    });
                }
            })
        } catch (error) {
            response.send({ "Exception": error });
        }

    }

    /**
    * @api $BASE_URL/authenticate/email/password
    * @description Api authenticating user at the time of login
    * @param request 
    * @param response 
    */
    login(request: express.Request, response: express.Response): void {
        try {
            const { email, password } = request.body;
            let userBusiness = new UserBusiness();
            userBusiness.login(email, password, (error, result) => {
                error
                    ?
                    response.status(404).send(Utility.generateResponse(404, error, false, null))
                    :
                    response.status(200).send(Utility.generateResponse(200, 'Login Sucessfully', true, result));
            })

        } catch (error) {
            response.send({ "Exception": error });
        }
    }

    /**
     * @api $BASE_URL/api/v1/auth/logout
     * @description For loging out from user session
     * @param request 
     * @param response 
     */
    logout(request: express.Request, response: express.Response): void {
        try {
            let _id = request.user._id;
            let userBusiness = new UserBusiness();
            userBusiness.logout(_id, (error, result) => {
                error
                    ?
                    response.send(Utility.generateResponse(404, error, false, null))
                    :
                    response.send(Utility.generateResponse(200, 'Loging out Sucessfully', true, result));
            })

        } catch (error) {
            response.send({ "Exception": error });
        }
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    update(request: express.Request, response: express.Response): void {
        try {
            let _id = request.params._id;

            let body = request.body;

            let userBusiness = new UserBusiness();
            userBusiness.update(_id, body, (error, result) => {

                error
                    ?
                    response.send(Utility.generateResponse(404, "Error " + error, false, null))
                    :
                    response.send(Utility.generateResponse(200, 'Updated Successfully', true, result));
            })
        } catch (e) {
            response.send({ "exception": e });
        }
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    updateAll(request: express.Request, response: express.Response): void {
        try {
            let lastName = request.params.lastName;

            let body = request.body;

            let userBusiness = new UserBusiness();
            userBusiness.updateAll(lastName, body, (error, result) => {
                error
                    ?
                    response.send(Utility.generateResponse(404, "Error " + error, false, null))
                    :
                    response.send(Utility.generateResponse(200, 'Updated Successfully', true, result));
            })
        } catch (e) {
            response.send({ "exception": e });
        }
    }

    /**
     * @api $BASE_URL/api/v1/allUsers
     * @description Api for getting all users
     * @param request 
     * @param response 
     */
    retrieve(request: express.Request, response: express.Response): void {
        try {
            const user = request.user;

            const userBusiness = new UserBusiness();
            userBusiness.retrieve((error, result) => {
                error ? response.status(404).send(Utility.generateResponse(404, error, false, null)) : response.send(Utility.generateResponse(200, 'All users', true, result));

            });
        }

        catch (e) {
            response.send({ "exception": e });
        }
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    delete(request: express.Request, response: express.Response): void {
        response.send({
            url: request.url,
            data: {
                name: "rahul",
                msg: "from DELETE call"
            }
        });
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    findById(request: express.Request, response: express.Response): void { }

    /**
     * @description Test api for elastic search testing
     * @param request 
     * @param response 
     */

    /**
     * 
     * @param request 
     * @param response 
     */
    searchCheck(request: express.Request, response: express.Response): void {

        // ElasticInfo.getHealth((res) => {
        //     response.send(res);
        // })

        // ElasticInfo.getCount('users','admin',(res) => {
        //     response.send(res);
        // })

        // ElasticSearchOperations.createIndex("users" , (err , res) => {
        //     err
        //     ? response.send(err)
        //     : response.send(res);

        // })

        // ElasticSearchOperations.deleteIndex("users" , (err , res) => {
        //     err
        //     ? response.send(err)
        //     : response.send(res);

        // })

        // ElasticSearchOperations.insertOne("users","admin","3",{email:"uday@gmail.com", password:"12345@Abc"   }, 

        // (err , res) => {
        //     err
        //     ? response.send(err)
        //     : response.send(res);

        // })

        //  ElasticSearchOperations.deleteOne("users","admin","2",(err , res) => {
        //     err
        //     ? response.send(err)
        //     : response.send(res);

        // })

        //  ElasticSearchOperations.insertAll("users","admin",DummyData.data, 

        // (err , res) => {
        //     err
        //     ? response.send(err)
        //     : response.send(res);

        // })


        let data = {

            query: {
                match: { "Region": "South East" }
            }
        }
        ElasticSearchOperations.search("users", "admin", data,

            (err, res) => {
                err
                    ? response.send(err)
                    : response.send(res);

            })
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    renderForgotPasswordTemplate(request: express.Request, response: express.Response): void {
        return response.sendFile(path.resolve('/home/uday/projects/Angular-Projects/quora-clone/server/src/public/forgot-password.html'));
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    renderResetPasswordTemplate(request: express.Request, response: express.Response): void {
        return response.sendFile(path.resolve('/home/uday/projects/Angular-Projects/quora-clone/server/src/public/reset-password.html'));
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    forgotPassword(request: express.Request, response: express.Response): void {
        try {
            const email = request.body.email;
            const userBusiness = new UserBusiness();
            userBusiness.forgotPassword(email, (error, result) => {
                error
                    ?
                    response.send(Utility.generateResponse(404, error, false, null))
                    :
                    response.send(Utility.generateResponse(200, 'Email Successfully sent for reset Password', true, result));
            })

        } catch (error) {
            response.send({ "Exception": error });
        }
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    resetPassword(request: express.Request, response: express.Response): void {
        try {
            const { newPassword, verifyPassword, token } = request.body;
            const userBusiness = new UserBusiness();
            userBusiness.resetPassword(newPassword, verifyPassword, token, (error, result) => {
                error
                    ?
                    response.send(Utility.generateResponse(404, error, false, null))
                    :
                    response.send(Utility.generateResponse(200, 'Succesfully Reset the password', true, result));
            })

        } catch (error) {
            response.send({ "Exception": error });
        }
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    sendConfirmation(request: express.Request, response: express.Response): void {
        try {
            const userBusiness = new UserBusiness();
            const {verificationToken} = request.params;
            debugger;
            userBusiness.sendConfirmation(verificationToken, (error, result) => {
                error
                    ?
                    response.send(Utility.generateResponse(404, error, false, null))
                    :
                    response.send(Utility.generateResponse(200, 'Verified', true, result));
            })
        } catch (error) {
            response.send({ "Exception": error });
        }
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    resendConfirmation(request: express.Request, response: express.Response): void {
        try {
            const {email} = request.body.email;
            const userBusiness = new UserBusiness();
            userBusiness.resendConfirmation(email, function (error, result) {
                if(error) {
                    response.send(Utility.generateResponse(404, error, false, null))
                }else{
                    const mailOptions = {
                        from: MailerEmail,
                        to: result.email,
                        subject: 'Account Verification Token',
                        text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + request.headers.host + '\/api\/v1\/confirmation\/' + result.verificationToken + '.\n'
                    };

                    const smtpTransport = nodemailer.createTransport({
                        service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
                        auth: {
                            user: MailerEmail,
                            pass: MailerPassword
                        }
                    });

                    this.smtpTransport.sendMail(mailOptions, (err) => {
                        if (err) {
                            response.status(500).send(Utility.generateResponse(404, 'Not able send Verification email', false, null))
                        }
                        // res.status(200).send('A verification email has been sent to ' + user.email + '.');
                        response.status(200).send(Utility.generateResponse(200, `A verification email has been sent to ${result.email}.`, true, result));
                    });
                } 
            })

        } catch (error) {

        }
    }

}
export = UserController;
