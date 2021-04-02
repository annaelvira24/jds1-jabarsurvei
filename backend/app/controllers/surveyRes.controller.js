'use strict';

const SurveyRes = require('../models/SurveyRes.model');

exports.getResult = function(req, res) {
    SurveyRes.getResult(req.params.link, 
    function(err, form) {  
        if (err)  res.send(err);  
        res.json(form);
    });
};

