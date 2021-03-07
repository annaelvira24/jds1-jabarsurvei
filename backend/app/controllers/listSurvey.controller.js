'use strict';

const ListSurvey = require('../models/listSurvey.model');

exports.findAll = function(req,res) {
    const offset = req.query.offset
    const limit = req.query.limit
    ListSurvey.findAll(
        offset, limit,
        function(err, listSurvey) {  
            if (err)  res.send(err);  
            res.json(listSurvey);
        }
    );
};

exports.findById = function(req, res) {
    ListSurvey.findById(req.params.id, 
    function(err, listSurvey) {  
        if (err)  res.send(err);  
        res.json(listSurvey);
    });
};

exports.findByLink = function(req, res) {
    ListSurvey.findByLink(req.params.link, 
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



