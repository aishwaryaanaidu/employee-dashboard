'use strict';

const path = require('path');
const _ = require('lodash');
const local = require('../local.env');

if(!process.env.EMPLOYEE_NODE_ENV) {
    console.log("Environment not set. Please set EMPLOYEE_NODE_ENV to development | test");
    requiredProcessEnv(EMPLOYEE_NODE_ENV);
    process.exit(2);
}

function requiredProcessEnv(name) {
    if(!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

let config ={
    env: process.env.EMPLOYEE_NODE_ENV,

    // Root path of the server
    root: path.normalize(__dirname + '../../..'),

    // Server port
    port: process.env.port || 8000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    // Populate the database with sample data -> true/false
    seedDB: false,

    mongo: {
        options: {
            useNewUrlParser: true
        }
    },

    selfDomain: "erpfs.com",
};

module.exports = _.merge(
    config,
    require('./' + process.env.EMPLOYEE_NODE_ENV + '.js') || {},
    require('../local.env')
);