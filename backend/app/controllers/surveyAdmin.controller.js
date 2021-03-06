'use strict';

const SurveyAdmin = require('../models/surveyAdmin.model');

exports.findById = function(req, res) {
    const offset = req.query.offset
    const limit = req.query.limit
    const query = req.query.query
    SurveyAdmin.findById(req.params.id, offset, limit, query,
    function(err, surveyAdmin) {  
        if (err)  res.send(err);  
        res.json(surveyAdmin);
    });
};

exports.updateStatus= function(req, res) {
    SurveyAdmin.updateStatus(req.body.id, req.body.status,
    function(err, response) {  
        if (err){
            res.send(err);  
        }
        else{
            res.json(response);
        }
    });
};



