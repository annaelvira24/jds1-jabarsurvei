'use strict';

const Admin = require('../models/admin.model');

exports.create = function(req, res) {
    const new_admin = new Admin(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){  
        res.status(400).send({ 
            error:true, message: 'Please provide all required field' 
        });
    }
    
    else{
        Admin.create(new_admin, function(err, admin) {
            if (err) {
                res.send(err);  
            } 
            else{
                res.status(200).json({
                    error:false, data:{
                        "id_admin" : admin
                    }
                });
            }
            return;
        });
    }
};

exports.findById = function(req, res) {
    Admin.findById(req.params.id, 
    function(err, admin) {  
        if (err)  res.send(err);  
        res.json(admin);
    });
};

exports.login = function(req, res) {
    Admin.login(req,
    function(err, admin) {  
        if (err){
            res.send(err);
        }
        else{
            res.status(200).json(admin);
        }
        return;
    });
};
