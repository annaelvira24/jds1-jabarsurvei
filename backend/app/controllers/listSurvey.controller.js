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
    ListSurvey.findAll(
    function(err, listSurvey) {  
        if (err)  res.send(err);  
        res.json(listSurvey);
    });
};



