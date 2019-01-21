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

        /**
         * @description allUsers route is protected with validate user guard
         */
        router.get("/allUsers", ValidateUser.validateUser, controller.retrieve);

        router.post("/user", controller.create);
        router.post("/login", controller.login);

        return router;
    }
}

Object.seal(UserRoutes);
export = UserRoutes;