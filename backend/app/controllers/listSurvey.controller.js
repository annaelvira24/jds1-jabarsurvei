'use strict';

const ListSurvey = require('../models/listSurvey.model');

exports.findAll = function(req,res) {
    ListSurvey.findAll(
    function(err, listSurvey) {  
        if (err)  res.send(err);  
        res.json(listSurvey);
    });
};

exports.count = function(req,res) {
    ListSurvey.count(
    function(err, count) {  
        if (err)  res.send(err);  
        res.json(count[0]);
    });
};



