'use strict';

var dbConn = require('../config/db.config');

var SurveyFill = function(SurveyFill){
    this.id_survey = SurveyFill.id_survey;
    this.order_number = SurveyFill.order_number;
    this.section = SurveyFill.section;
    this.active_status = SurveyFill.active_status;
    this.details = SurveyFill.details;
    this.survey_title = SurveyFill.survey_title;
    this.decription = SurveyFill.decription;

};

SurveyFill.getDescription = function(id, result){
    dbConn.query("Select survey_title, decription from survey where id_survey = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

SurveyFill.findById = function(id, result) {
    dbConn.query("Select details from question where id_survey = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = SurveyFill;