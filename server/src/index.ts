import express = require('express');
import fs = require('fs');
import https = require('https');
import path = require('path');

require('dotenv').config();

import Middlewares = require('./config/middlewares/base/');
import Utility from './controllers/_helper/utility';

// import getIp = require('./getIp');
// const key = fs.readFileSync(path.resolve('/home/uday/projects/Angular-Projects/quora-clone/server/src/config/ssl/localhost.key'));
// const certificate = fs.readFileSync(path.resolve('/home/uday/projects/Angular-Projects/quora-clone/server/src/config/ssl/localhost.crt'));

// const options = {
//     pfx: fs.readFileSync(path.resolve('/home/uday/projects/Angular-Projects/quora-clone/server/src/config/ssl/crt.pfx')),
//     passphrase: 'password'
// };

// const options = {
//     key:key,
//     certificate:certificate
// };

const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;
app.set("port", port);
app.use(Middlewares.configuration);
// console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", options);

app.listen(port, () => {
    console.log("Node app is running at localhost:" + port);
})

console.log(Utility.getIp());
const IpAddress = Utility.getIp();        

// https.createServer(options, app).listen(port,IpAddress, () => {
//     console.log("Node app is running at localhost:" + port);
// });