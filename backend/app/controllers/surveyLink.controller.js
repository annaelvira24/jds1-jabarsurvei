'use strict';

const SurveyLink = require('../models/surveyLink.model');

exports.findLinkById = function(req, res) {
    SurveyLink.findLinkById(req.params.id, 
    function(err, surveyLink) {  
        if (err)  res.send(err);  
        res.json(surveyLink);
    });
};

exports.createLink = function(req, res) {
    SurveyLink.createLink(req, 
    function(err, surveyLink) {  
        if (err){
            res.send(err);
        }
        else{
            res.status(200).json(surveyLink);
        }
        return;
    });
};