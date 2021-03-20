'use strict';

const ListSurvey = require('../models/listSurvey.model');

exports.create = function(req, res) {
    const newSurvey = new ListSurvey(req.body);
    ListSurvey.create(newSurvey, function(err, listSurvey) {
        if (err) {
            res.send(err);  
        } 
        else{
            res.status(200).json({
                error:false, data:{
                   "id_survey" : listSurvey
                }
            });
        }
        return;
    });
};

exports.findAll = function(req,res) {
    const offset = req.query.offset
    const limit = req.query.limit
    const query = req.query.query
    ListSurvey.findAll(
        offset, limit, query,
        function(err, listSurvey) {  
            if (err)  res.send(err);  
            res.json(listSurvey);
        }
    );
};

exports.count = function(req,res) {
    ListSurvey.count(
    function(err, count) {  
        if (err)  res.send(err);  
        res.json(count[0]);
    });
};



