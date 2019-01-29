import express = require('express');

import UserController = require('../../controllers/UserController');
import ValidateUser = require('../middlewares/ValidateUser');

var router = express.Router();

class UserRoutes {
    private _UserController: UserController;

    constructor() {
        this._UserController = new UserController();
    }

    get routes() {
        var controller = this._UserController;



        router.post("/user", controller.create);
        router.post("/login", controller.login);

        /**
        * @description allUsers route is protected with validate user guard
        */
        router.get("/auth/allUsers",ValidateUser.auth, controller.retrieve);
        router.get("/auth/logout", ValidateUser.auth, controller.logout);

        router.put("/update", controller.update);
        router.delete("/delete", controller.delete);

        /**
         * Test api
         */
        router.get("/auth/search", controller.searchCheck);

        router.put('/auth/update/:_id',controller.update);
        
        router.put('/auth/updateall/:lastName', controller.updateAll);

        router.post('/auth/forgot_password',controller.forgotPassword);

        router.get('/auth/forgot_password',controller.renderForgotPasswordTemplate);

        router.get('/auth/reset_password',controller.renderResetPasswordTemplate);




        return router;
    }
}

Object.seal(UserRoutes);
export = UserRoutes;