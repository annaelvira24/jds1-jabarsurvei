'use strict';

const SurveyLink = require('../models/surveyLink.model');

exports.findLinkById = function(req, res) {
    SurveyLink.findLinkById(req.params.id, 
    function(err, surveyLink) {  
        if (err)  res.send(err);  
        res.json(surveyLink);
    });
};