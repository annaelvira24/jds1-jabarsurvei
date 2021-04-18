'use strict';
const { nanoid } = require('nanoid')
var axios = require('axios');
require('dotenv').config()
var dbConn = require('./../config/db.config');

var Answer = function(answer){
    this.id_quetion = answer.id_quetion;
    this.id_survey = answer.id_survey;
    this.id_answer = answer.id_answer;
    this.answer = answer.answer;
    this.isHuman = answer.isHuman;

};

Answer.getLastIdAnswer = function (result) {
    dbConn.query("Select MAX(id_answer) as id_answer from answer ", function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

async function validateHuman(token){
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    console.log(secret);
    const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
      );
    console.log(response.data.success);
    return response.data.success;
}

Answer.submitAnswer = async function (answers, result){
    const idSurvey = answers.id;
    const link = answers.link;
    const timestamp = answers.timestamp;
    const recaptchaResponse = answers.recaptchaResponse;
    const data = JSON.parse(answers.data);
    
    var ids;

    const isHuman = await validateHuman(recaptchaResponse);
    if (!isHuman) {
        result(null,isHuman);
        return
      }

    dbConn.query("Select id_question from question join link using (id_survey) where randomlink = ?",link, function(err,res,fields){
        if (err) result(err, null)
        else {
            ids = res;

            var q_index = 0;
            for (var i = 0; i < data.length; i++){
                const question = data[i];
                console.log(question)
                if (question.type === "header" || question.type === "file" || question.type === "paragraph"){
                    q_index += 1;
                    continue;
                }
                var user_data;
                if (question.type === "checkbox-group" || question.type === "alamat"){
                    if(question.userData !== undefined){
                        user_data = JSON.stringify(question.userData);
                    }
                    else{
                        user_data = "";
                    }
                } 
                else if (question.type === "radio-group"){
                    if(question.userData == undefined){
                        user_data = "";
                    }
                    else{
                        user_data = question.userData[0];
                    }
                }
                else {
                    user_data = question.userData[0];
                }

                const test = {
                    id_question: ids[q_index].id_question,
                    id_survey: idSurvey,
                    answer: user_data
                }
                
                dbConn.query("INSERT INTO answer SET ?", test, function(err, res){
                    if (err) {
                        result(err, null);
                        return;
                    }
                })
                q_index += 1;
            }
            console.log("Submit successful!");
            result(null, res);
            return;
        }
    })
}

Answer.count = function (result) {
    dbConn.query(
        "SELECT COUNT(DISTINCT submit_time) as count from answer", function (err, res) {
        if(err) {
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = Answer;