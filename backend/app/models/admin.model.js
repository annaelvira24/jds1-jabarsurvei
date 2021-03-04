'use strict';

var dbConn = require('./../config/db.config');

//Admin object create 

var Admin = function(admin){
    this.email = admin.email;
    this.username = admin.username;
    this.password_hashed  = admin.password_hashed;
};

Admin.findById = function (id, result) {
    dbConn.query("Select * from admin where id_admin = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

Admin.login = function (req, result) {
    var email  = req.body.email;
    var password = req.body.password;

    // var email = "example@gmail.com";
    // var password = "password123";

    console.log("hei");

    dbConn.query("Select * from admin where email = '"+email+"' and password_hashed = md5('"+password+"') ",
    function (err, res) {
        if(res.length>0){
            //req.session.userId = results[0].id;
            //req.session.user = results[0];
            //console.log(res[0]);
            result(null, res);
         }
         else{
            result(err, null);
         }
    });
};

Admin.createForm = function (req, result) {
    console.log("inside model")
    console.log(req.body)
    var jsonform = JSON.stringify(req.body)
    var tempidsurvey = 69; //temp aja ini
    var tempidadmin = 1; //temp aja ini

    var questions = JSON.parse(jsonform);
    //var question_detail = (questions[0]);
    for(var i = 0; i < length(questions);i++){ //iterasi per pertanyaan

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

module.exports = Admin;