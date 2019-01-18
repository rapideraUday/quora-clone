import express = require('express');

import UserController = require('../../controllers/UserController');

var router = express.Router();

class UserRoutes {
    private _UserController: UserController;

    constructor() {
        this._UserController = new UserController();
    }

    get routes() {
        var controller = this._UserController;
        router.get("/allUsers", controller.retrieve);
        router.post("/user", controller.create);

        return router;
    }
}

Object.seal(UserRoutes);
export = UserRoutes;