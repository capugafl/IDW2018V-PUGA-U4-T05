const status = require('http-status');
const config = require('../_config');
const handler = require('../utils/handler');
const http = require('http');
const async = require('async');
var qr = require('qr-image');
var fs = require('fs');
const path = require('path');
// var async = require('async');

let _attender;

const getAll = (req, res) => {
    _attender.find({})
        .sort({ 'name.lastName': 1, 'name.firstName': 1 })
        .exec(handler.handleMany.bind(null, 'attenders', res));
};

module.exports = (Attender) => {
    _attender = Attender;
    return ({
        getAll
    });
}