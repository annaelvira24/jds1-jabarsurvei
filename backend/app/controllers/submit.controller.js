'use strict';

const Answer = require('../models/submit.model');

exports.getLastIdAnswer = function(req, res) {
    Answer.getLastIdAnswer(
    function(err, answer) {  
        if (err)  res.send(err);  
        res.json(answer);
    });
};

exports.submitAnswer = function(req,res){
    Answer.submitAnswer(
        req.body, 
        function(err, answer){
            if (err) {
                res.send(err);
            }
            else{
                res.json(answer);
            }
            return;
        });
};

exports.count = function(req,res){
    Answer.count(
    function(err, answer){
        if (err) {
            res.send(err);
        }
        else{
            res.json(answer[0]);
        }
        return;
    });
};
