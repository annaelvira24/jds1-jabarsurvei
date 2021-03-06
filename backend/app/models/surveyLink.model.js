'use strict';
const { nanoid } = require('nanoid')

var dbConn = require('./../config/db.config');



var SurveyLink = function(surveyL){
    this.randomlink = surveyL.randomlink;
    this.id_survey = surveyL.id_survey;
    this.id_admin = surveyL.id_admin;
};


SurveyLink.findLinkById = function (id, result) {
    dbConn.query("Select randomlink from link where id_survey = ? ", id, function (err, res) {
        // let randomlink = nanoid();
        // console.log(randomlink);
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
    let id_survey  = req.body.id_survey;
    let id_admin = req.body.id_admin;
    let randomlink = nanoid();
    let status = 0;
    let query = "INSERT INTO link (randomLink, id_survey, id_admin)"+" SELECT * FROM (SELECT'" + randomlink + "' as ranlink,"+ id_survey +" as surveyid,"+id_admin+" as adminid) AS cek " + "WHERE NOT EXISTS(SELECT randomLink FROM link WHERE randomLink ='"+ randomlink + "')";

    dbConn.query(query,
        function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
              }
              else{
                console.log(randomlink);
                result(null, randomlink);
              }
        }
    );

  
    
    
};


module.exports = SurveyLink;