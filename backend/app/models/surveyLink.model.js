'use strict';

var dbConn = require('./../config/db.config');



var SurveyLink = function(surveyL){
    this.randomlink = surveyL.randomlink;
    this.id_survey = surveyL.id_survey;
    this.id_admin = surveyL.id_admin;
};


SurveyLink.findLinkById = function (id, result) {
    dbConn.query("Select randomlink from link where id_survey = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

SurveyLink.createLink = function (req, result) {
    var id_survey  = req.body.id_survey;
    var id_admin = req.body.id_admin;
    var randomlink;
    var table_name = "table_" + id_survey;

    var query = " INSERT INTO Link VALUES ('"+ randomlink +"', "+ id_survey +", "+ id_admin+", '"+table_name+"')"
    
    dbConn.query(query,
    function (err, res) {
        if(res.length>0){
            result(null, res);
         }
         else{
            result(err, null);
         }
    });
};


module.exports = SurveyLink;