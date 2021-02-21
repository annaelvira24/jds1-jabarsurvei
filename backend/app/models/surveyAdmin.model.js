'use strict';

var dbConn = require('./../config/db.config');

//Admin object create 

var SurveyAdmin = function(survey){
    this.id_survey = survey.id_survey;
    this.id_admin = survey.id_admin;
    this.survey_title  = survey.survey_title;
    this.description  = survey.description;

};

SurveyAdmin.findById = function (id, result) {
    dbConn.query("Select  * FROM (SELECT survey.id_survey, survey.id_admin, survey.survey_title, survey.decription, admin.username FROM survey LEFT JOIN admin ON survey.id_admin = admin.id_admin ORDER BY survey.id_survey) t where id_admin = ?", id, function (err, res) {
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