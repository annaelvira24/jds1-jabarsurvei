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
    var tempidsurvey = 1;
    var tempidadmin = 1;

    var questions = JSON.parse(jsonform);
    var question_detail = (questions[0]);
    for(var x in question_detail){
        if(x == "values"){
            for(var y in question_detail[x]){
            console.log(question_detail[x][y])
            }
        }
        console.log(x + " " +question_detail[x])
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