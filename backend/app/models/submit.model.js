'use strict';
const { nanoid } = require('nanoid')

var dbConn = require('./../config/db.config');



var Answer = function(answer){
    this.id_quetion = answer.id_quetion;
    this.id_survey = answer.id_survey;
    this.id_answer = answer.id_answer;
    this.answer = answer.answer;

};

Answer.getLastIdAnswer = function (result) {
    dbConn.query("Select MAX(id_answer) as id_answer from answer ", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};





module.exports = Answer;