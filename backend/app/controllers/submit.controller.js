'use strict';

const Answer = require('../models/submit.model');

exports.getLastIdAnswer = function(req, res) {
    Answer.getLastIdAnswer(
    function(err, answer) {  
        if (err)  res.send(err);  
        res.json(answer);
    });
};

// exports.createLink = function(req, res) {
//     Answer.createLink(req, 
//     function(err, Answer) {  
//         if (err){
//             res.send(err);
//         }
//         else{
//             res.status(200).json(Answer);
//         }
//         return;
//     });
// };
