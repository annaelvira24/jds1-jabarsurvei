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
    const link = answers.link;
    const timestamp = answers.timestamp;
    const data = JSON.parse(answers.data);
    
    var ids;

    dbConn.query("Select id_question from question join link using (id_survey) where randomlink = ?",link, function(err,res,fields){
        if (err) result(err, null)
        else {
            ids = res;

            var q_index = 0;
            for (var i = 0; i < data.length; i++){
                const question = data[i];
                console.log(question)
                if (question.type === "header" || question.type === "file" || question.type === "paragraph") 
                    continue;
                var user_data;
                if (question.type === "checkbox-group"){
                    user_data = JSON.stringify(question.userData);
                } else {
                    user_data = question.userData[0]
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





module.exports = Answer;