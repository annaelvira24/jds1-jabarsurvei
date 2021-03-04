'use strict';

const SurveyAdmin = require('../models/surveyAdmin.model');

exports.findById = function(req, res) {
    const offset = req.query.offset
    const limit = req.query.limit
    SurveyAdmin.findById(req.params.id, offset, limit,
    function(err, surveyAdmin) {  
        if (err)  res.send(err);  
        res.json(surveyAdmin);
    });
};



