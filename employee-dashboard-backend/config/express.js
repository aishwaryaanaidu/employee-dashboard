// Express configuration

'use strict';

const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorHandler');

module.exports = function (app) {
    const env = app.get('env');

    // Restricting AJAX access to a single origin
    // app.use(cors({
    //     origin: 'http://yourapp.com'
    // }));

    app.use(cors());
    app.use(compression());

    app.use(bodyParser.urlencoded({
        extended: false,
        limit: '50mb'
    }));
    app.use(bodyParser.json({
        limit: '50mb'
    }));
    
    if ('development' === env || 'test' === env) {
        app.use(morgan('dev'));
        app.use(errorHandler());
    }
}