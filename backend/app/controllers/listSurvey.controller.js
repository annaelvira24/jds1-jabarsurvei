'use strict';

const ListSurvey = require('../models/listSurvey.model');

exports.findAll = function(req,res) {
    ListSurvey.findAll(
    function(err, listSurvey) {  
        if (err)  res.send(err);  
        res.json(listSurvey);
    });
};

exports.findPart = function(req,res) {
    // res.send(req.query)
    ListSurvey.findPart (
        req.query.offset, req.query.limit,
        function(err, listSurvey) {  
            if (err)  res.send(err);  
            res.json(listSurvey);
        }
    );
}



