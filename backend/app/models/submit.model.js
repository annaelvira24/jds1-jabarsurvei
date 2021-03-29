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

Answer.submitAnswer = function (answers, result){
    const idSurvey = answers.id;
    const timestamp = answers.timestamp;
    const data = JSON.parse(answers.data);
    
    var ids;

    dbConn.query("Select id_question from question where id_survey = "+idSurvey, function(err,res,fields){
        if (err) result(err, null)
        else {
            ids = res;

            var q_index = 0;
            for (var i = 0; i < data.length; i++){
                const question = data[i];
                if (question.type === "header" || question.type === "file" || question.type === "paragraph") 
                    continue;
                const user_data = JSON.stringify(question.userData);
                const test = {
                    id_question: ids[q_index].id_question,
                    id_survey: idSurvey,
                    answer: user_data
                }
                dbConn.query("INSERT INTO answer SET ?", test, function(err, res){
                    if (err) {
                        result(err, null);
                    }
                })
                q_index += 1;
            }
            console.log("Submit successful!");
            result(null, res);
        }
    })
    
    
    
}





module.exports = Answer;