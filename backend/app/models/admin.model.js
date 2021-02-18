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
    //var post  = req.body;
    // var email= post.email;
    // var password= post.password;

    var email = "example@gmail.com";
    var password = "password123";

    console.log("hei");

    dbConn.query("Select * from admin where email = '"+email+"' and password_hashed = md5('"+password+"') ",
    function (err, res) {
        if(res.length>0){
            //req.session.userId = results[0].id;
            //req.session.user = results[0];
            console.log(res[0]);
            result(null, res);
            // TODO: res.redirect('/');
         }
         else{
            err = "wrong email/password"
            result(err, null);
         }
    });
};

module.exports = Admin;