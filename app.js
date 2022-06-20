require('dotenv').config({ debug: true, override: false })
const express = require('express');
const jwt = require("jsonwebtoken");
const logger = require('morgan');
const bodyParser = require('body-parser')
const http = require("http");
const https = require('https');
var fileUpload = require('express-fileupload');
const app = express();
const port = process.env.PORT || 8084;
const session = require('express-session');
//const port_https = process.env.PORT_HTTPS || 443;
const routes = require('./routes');
const rfs = require("rotating-file-stream");
const path = require("path");
const md5 = require('md5');
const _ = require('lodash');
const fileWriter = rfs.createStream('errors.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
});
const {StatusCodes} = require('http-status-codes');
const fs = require("fs");

const connection = require("./database/connection");
const bcrypt = require('bcrypt');
const dbhelper = require("./models/db_helper.js");
const joi = require("joi");
const common_helper = require('./utils/common_helper');
const emailactivation = require('./notification/emailactivation');

const saltRound = 10;

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT,PATCH, DELETE, OPTIONS, ');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
};
app.use(allowCrossDomain);
// Error logger
app.use(logger('dev', {
    skip: function (req, res) { return res.statusCode < 400 },
    stream: fileWriter
}))
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use("/api/v1", routes);
app.use('/favicon.ico', (req, res) => {
    res.status(StatusCodes.OK).send();
});

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = StatusCodes.NOT_FOUND;
    next(error);
});

// error handler middleware
app.use((error, req, res) => {
    if (process.env.NODE_ENV === "dev") {
        res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).send({message: error.message || 'Internal Server Error',});
    } else {
        res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).send({message: 'Internal Server Error',});
    }
});


      
       if(connection)
{
    console.log('Database connection was established');
}
else{
    console.log('No database connection was established');
} 

const keyFile = path.join(__dirname, 'home', 'etc', 'letsencrypt', 'live', 'aiimmaglobal.com', 'privkey.pem');

const certFile = path.join(__dirname, 'home', 'etc', 'letsencrypt', 'live', 'aiimmaglobal.com', 'fullchain.pem');;

const sslServer = https.createServer(
{
   key: fs.readFileSync(keyFile),
   cert: fs.readFileSync(certFile), 
}, app
);

sslServer.listen(process.env.PORT, ()=> console.log(`Secure SSL HTTP Server started on port ${process.env.PORT}`));

/*http.createServer(app).listen(() => {
    console.log('HTTP API server started on http://localhost/api/v1');
});*/

 /* http.createServer(app).listen(port, () => {
    console.log('HTTP API server started on http://localhost:'+ port+'/api/v1');
}); */

// Create an HTTPS service identical to the HTTP service. Uncomment below line
// const options = {
//    key: fs.readFileSync('/domain.com.key'),
//    cert: fs.readFileSync('/certificate.crt')
// };
// https.createServer(options, app).listen(port_https, () => {
//     console.log('HTTPS API server started on https://localhost:'+ port_https+'/api/v1');
// });

process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at:", p, "reason:", reason)
});
