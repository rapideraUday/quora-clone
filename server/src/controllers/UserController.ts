import express = require('express');
import path = require('path');

import IBaseController = require('./interfaces/base');
import UserBusiness = require('../app/business/UserBusiness')
import IUserModel = require('../app/model/interfaces/UserModel');
import { IResponseFormat } from './interfaces/common/ResponseFormat';
import Utility from './_helper/utility';
import ElasticInfo from '../config/elasticsearch/info';
import ElasticSearchOperations from '../config/elasticsearch/operations';



// var inputfile = require("./dummydata.json");

import DummyData from './_helper/dummydata';


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

    updateAll(request: express.Request, response: express.Response): void {
        try {
            let lastName = request.params.lastName;

            let body = request.body;

            let userBusiness = new UserBusiness();
            userBusiness.updateAll(lastName, body, (error, result) => {
                console.log("Error: !!!!!!",error);
                error
                    ?
                    response.send(Utility.generateResponse(404, "Error " + error, false, null))
                    :
                    response.send(Utility.generateResponse(200, 'Updated Successfully', true, result));
            })
        } catch (e) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!",e);
            
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
                console.log(error)
                error ? response.status(404).send(Utility.generateResponse(404, error, false, null)) : response.send(Utility.generateResponse(200, 'All users', true, result));

            });
        }

        catch (e) {
            response.send({ "exception": e });
        }
    }

    delete(request: express.Request, response: express.Response): void {
        console.log(request.body);

        response.send({
            url: request.url,
            data: {
                name: "rahul",
                msg: "from DELETE call"
            }
        });
    }
    findById(request: express.Request, response: express.Response): void { }

    /**
     * @description Test api for elastic search testing
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


    renderForgotPasswordTemplate(request: express.Request, response: express.Response): void{
        return response.sendFile(path.resolve('/home/uday/projects/Angular-Projects/quora-clone/server/src/public/forgot-password.html'));
    }

    renderResetPasswordTemplate(request: express.Request, response: express.Response): void{
        return response.sendFile(path.resolve('/home/uday/projects/Angular-Projects/quora-clone/server/src/public/reset-password.html'));
    }
    forgotPassword(request: express.Request, response: express.Response): void {
        console.log("request", request);
        
        try {
            const email = request.body.email;
            debugger
            const userBusiness = new UserBusiness();
            userBusiness.forgotPassword(email, (error, result) => {
                console.log(error);
                
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



}
export = UserController;
