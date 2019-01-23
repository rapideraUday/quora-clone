import express = require('express');
import IBaseController = require('./interfaces/base');
import UserBusiness = require('../app/business/UserBusiness')
import IUserModel = require('../app/model/interfaces/UserModel');
import { IResponseFormat } from './interfaces/common/ResponseFormat';
import Utility from './_helper/utility';

class UserController implements IBaseController<UserBusiness>{
    private _responseFormat: IResponseFormat;
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
                error ? response.send(error) : response.send(result);
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
                    response.send(Utility.generateResponse(404, error, false, null))
                    :
                    response.send(Utility.generateResponse(200, 'Login Sucessfully', true, result));
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


    update(request: express.Request, response: express.Response): void {
        console.log(request.body);

        response.send({
            url:request.url,
            data:{
                name:"rahul",
                msg:"from PUT call"
            }
        });
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
                error ? response.send({ "error": error }) : response.send(result);
            });
        }

        catch (e) {
            response.send({ "exception": e });
        }
    }

    delete(request: express.Request, response: express.Response): void {
        console.log(request.body);
        
        response.send({
            url:request.url,
            data:{
                name:"rahul",
                msg:"from DELETE call"
            }
        });
     }
    findById(request: express.Request, response: express.Response): void { }



}
export = UserController;
