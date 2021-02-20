'use strict';

const SurveyAdmin = require('../models/surveyAdmin.model');

exports.findById = function(req, res) {
    SurveyAdmin.findById(req.params.id, 
    function(err, surveyAdmin) {  
        if (err)  res.send(err);  
        res.json(surveyAdmin);
    });
};



