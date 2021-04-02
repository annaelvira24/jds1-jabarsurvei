'use strict';

var dbConn = require('../config/db.config');

var SurveyRes = function(SurveyRes){
    this.id_survey = SurveyRes.id_survey;
    this.order_number = SurveyRes.order_number;
    this.details = SurveyRes.details;
    this.survey_title = SurveyRes.survey_title;
    this.decription = SurveyRes.decription;

};
SurveyRes.getResult = function(link, result){
    dbConn.query("Select link.id_survey as id_survey, survey_title, decription, details from survey,question,link where randomlink = ? and survey.id_survey = question.id_survey and survey.id_survey = link.id_survey  ", link, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
module.exports = SurveyRes;