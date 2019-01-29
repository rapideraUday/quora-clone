import express = require('express');
import fs = require('fs');
import https = require('https');
import path = require('path');


require('dotenv').config();

import Middlewares = require('./config/middlewares/base/');

const key = fs.readFileSync(path.resolve('/home/rapidera/RaulD_Workspace/MEAN/quora-clone/server/src/config/ssl/key.pem'));
const certificate = fs.readFileSync(path.resolve('/home/rapidera/RaulD_Workspace/MEAN/quora-clone/server/src/config/ssl/server.crt'));
const options = {
    key :key,
    certificate : certificate
};


console.log(options);

const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;
app.set("port", port);
app.use(Middlewares.configuration);

app.listen(port, () => {
    console.log("Node app is running at localhost:" + port);
})

// https.createServer(options, app).listen(port,() => {
//         console.log("Node app is running at localhost:" + port);
//     });