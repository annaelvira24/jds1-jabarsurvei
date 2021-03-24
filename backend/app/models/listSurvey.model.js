'use strict';

var dbConn = require('./../config/db.config');

//Admin object create 

var ListSurvey = function(survey){
    this.id_survey = survey.id_survey;
    this.id_admin = survey.id_admin;
    this.survey_title  = survey.survey_title;
    this.decription  = survey.decription;

};

ListSurvey.create = function(newSurvey, result){
    dbConn.query("INSERT INTO survey set ?", 
    newSurvey, function (err, res) {
        if(err) {  
            console.log("error: ", err);  
            result(err, null);
        }
        else{  
            console.log(res.insertId);  
            result(null, res.insertId);
        }
    });
};

ListSurvey.findAll = function (offset,limit,query,result) {
    var q = "SELECT survey.id_survey, survey.id_admin, survey.survey_title, survey.decription, admin.username FROM survey LEFT JOIN admin ON survey.id_admin = admin.id_admin"
    if (query) 
        q += ` WHERE survey.survey_title LIKE "%${query}%"`
    q += " ORDER BY survey.id_survey"
    if (offset && limit) 
        q += ` LIMIT ${limit} OFFSET ${offset}` 
    dbConn.query(
        q, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

ListSurvey.findById = function (id, result) {
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

ListSurvey.findByLink = function (link, result) {
    dbConn.query("Select survey_title, decription from survey join link using (id_survey) where randomlink = ? ", link, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

ListSurvey.count = function (result) {
    dbConn.query(
        "SELECT COUNT(*) as count from survey",
        
        function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};


module.exports = ListSurvey;