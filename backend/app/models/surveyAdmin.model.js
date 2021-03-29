'use strict';

var dbConn = require('./../config/db.config');

//Admin object create 

var SurveyAdmin = function(survey){
    this.id_survey = survey.id_survey;
    this.id_admin = survey.id_admin;
    this.survey_title  = survey.survey_title;
    this.description  = survey.description;

};

SurveyAdmin.findById = function (id, offset, limit, query, result) {
    var q = "Select * FROM (SELECT survey.id_survey, survey.id_admin, survey.survey_title, survey.decription, link.randomlink FROM survey LEFT JOIN link ON survey.id_survey = link.id_survey ORDER BY survey.id_survey DESC) t where id_admin = ?"
    if (query)
        q += ` and survey_title LIKE "%${query}%"`
    if (offset&&limit)
        q += ` LIMIT ${limit} OFFSET ${offset}`
    dbConn.query(q, id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};


module.exports = SurveyAdmin;