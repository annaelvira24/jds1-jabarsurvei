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

SurveyFill.getSurvey = function(id, result){
    dbConn.query("Select survey_title, decription, details from survey,question,link where randomlink = ? and survey.id_survey = question.id_survey and survey.id_survey = link.id_survey  ", id, function (err, res) {
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