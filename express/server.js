'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const connection = require('./mysql');
app.use(cors({
  origin:'*',
}));

connection.connect(
    function(err) {
        if (err) throw err
        console.log("Connected!");
    }
)


const router = require(path.join(__dirname, '../router/router'));


app.use(bodyParser.json());
app.use(router)



module.exports = app;
module.exports.handler = serverless(app);
