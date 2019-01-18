import express = require('express');
import IBaseController = require('./interfaces/base');
import UserBusiness = require('../app/business/UserBusiness')
import IUserModel = require('../app/model/interfaces/UserModel');

// const baseURL = "localhost:8626"

class UserController implements IBaseController<UserBusiness>{


    /**
     * @api localhost:8626/user
     * @description Api for creating new user
     * @param request 
     * @param response 
     */
    create(request: express.Request, response: express.Response): void {
        try {
            var user: IUserModel = <IUserModel>request.body;
            var userBusiness = new UserBusiness();
            userBusiness.create(user, (error, result) => {
                error ? response.send({ "error": error }) : response.send(result);
            })
        } catch (error) {
            response.send({ "Exception": error });
        }
    }

    update(request: express.Request, response: express.Response): void { }

    /**
     * @api localhost:8626/allUsers
     * @description Api for getting all users
     * @param request 
     * @param response 
     */
    retrieve(request: express.Request, response: express.Response): void {
        try {

            var userBusiness = new UserBusiness();
            userBusiness.retrieve((error, result) => {
                error ? response.send({ "error": error }) : response.send(result);
            });
        }

        catch (e) {
            response.send({ "exception": e });
        }
    }

    delete(request: express.Request, response: express.Response): void { }
    findById(request: express.Request, response: express.Response): void { }
}
export = UserController;
