'use strict';

var dbConn = require('../config/db.config');

var FBuilder = function(admin){
    //masih kosong
    /* this.email = admin.email;
    this.json = admin.username;
    this.password_hashed  = admin.password_hashed; */
};

FBuilder.createForm = function (req, result) {
    console.log("inside model")
    var jsonform = JSON.stringify(req.body)
    var tempidsurvey = 69; //temp aja ini
    var tempidadmin = 1; //temp aja ini

    var questions = JSON.parse(jsonform);
    //var question_detail = (questions[0]);
    for(var i = 0; i < questions.length;i++){ //iterasi per pertanyaan
        console.log(questions[i])
        /* for(var x in questions[i]){ //iterasi per properties pertanyaan
            if(x == "values"){ // untuk radio button atau checkbox
                for(var y in questions[i][x]){
                console.log(questions[i][x][y])
                }
            }
            console.log(x + " " +questions[i][x])
        }   */
    }
    // var email = "example@gmail.com";
    // var password = "password123";

    /* console.log("formSQL");

    dbConn.query("INSERT INTO admin set ?", 
    newAdmin, function (err, res) {
        if(err) {  
            console.log("error: ", err);  
            result(err, null);
        }
        else{  
            console.log(res.insertId);  
            result(null, res.insertId);
        }
    }); */
};
module.exports = FBuilder;