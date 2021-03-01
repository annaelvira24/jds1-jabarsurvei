'use strict';

const ListSurvey = require('../models/listSurvey.model');

exports.findAll = function(req,res) {
    const offset = req.query.offset
    const limit = req.query.limit
    ListSurvey.findAll(
        offset, limit,
        function(err, listSurvey) {  
            if (err)  res.send(err);  
            res.json(listSurvey);
        }
    );
};



