'use strict';

var dbConn = require('../config/db.config');

var FBuilder = function(fBuilder){
    this.id_survey = fBuilder.id_survey;
    this.order_number = fBuilder.order_number;
    this.section = fBuilder.section;
    this.active_status = fBuilder.active_status;
    this.details = fBuilder.details;
};

FBuilder.create = function(newFBuilder, result){
    dbConn.query("INSERT INTO question set ?", 
    newFBuilder, function (err, res) {
        if(err) {  
            console.log("error: ", err);  
            result(err, null);
        }
        else{ 
            result(null, res.insertID);
        }
    });
};

FBuilder.findById = function(id, result) {
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

module.exports = FBuilder;