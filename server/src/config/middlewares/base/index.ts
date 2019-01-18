import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');

import MethodOverride = require('../MethodOverride');
import BaseRoutes = require('../../routes/base'); 


class MiddlewaresBase {
    
    static get configuration () {
         var app = express();
         app.use(bodyParser.json());
         app.use(cors());
         app.use(MethodOverride.configuration());
         app.use(new BaseRoutes().routes);
         
         return app;
    }    
}
Object.seal(MiddlewaresBase);
export = MiddlewaresBase;