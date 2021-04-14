'use strict';

const SurveyRes = require('../models/SurveyRes.model');

exports.getResult = function(req, res) {
    SurveyRes.getResult(req.params.link, 
    function(err, form) {  
        if (err)  res.send(err);  
        res.json(form);
    });
};

exports.getAnswerByLink = function(req, res) {
    SurveyRes.getAnswerByLink(req.params.link, 
    function(err, form) {  
        if (err)  res.send(err);  
        res.json(form);
    });
};

exports.getAnswerByLinkAlter = function(req, res) {
    SurveyRes.getAnswerByLinkAlter(req.params.link, 
    function(err, form) {  
        if (err)  res.send(err);  
        res.json(form);
    });
};

exports.getQuestionCount = function(req, res) {
    SurveyRes.getQuestionCount(req.params.link, 
    function(err, form) {  
        if (err)  res.send(err);  
        res.json(form);
    });
};