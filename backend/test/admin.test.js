process.env.NODE_ENV = 'test';
var supertest = require("supertest");
const expect = require("chai").expect;

const app = require("../server");

var server = supertest.agent("http://localhost:5001");

describe("Admin unit test",function(){

  it("should return first admin",function(done){
    server
    .get("/api/admin/1")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.eql(200);
      expect(res.error).to.eql(false);

      expect(res.body[0].id_admin).to.eql(1);
      expect(res.body[0].email).to.eql('example@gmail.com');
      done();
    });
  });

});

describe("Admin unit test",function(){
  it("should successfully login",function(done){
    let admin = {
      email : "example@gmail.com", 
      password : "password123"
    }
    server
    .post("/api/admin/login")
    .send(admin)
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.eql(200);
      expect(res.error).to.eql(false);
      expect(res.body[0].id_admin).to.eql(1);
      done();
    });
  });
});

describe("Admin unit test",function(){
  it("should fail to login",function(done){
    let admin = {
      email : "example@gmail.com", 
      password : "wrongpassword"
    }
    server
    .post("/api/admin/login")
    .send(admin)
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err, res){
      expect(res.body).to.be.null;
      done();
    });
  });
});

describe("Admin unit test",function(){
  it("should register new admin",function(done){
    let admin = { 
      email : "newadmin@gmail.com",
      password : "newpassword",
      username : "newadmin",
      gender : "laki-laki",
      city : "Bandung",
      phone : "01234567"
   }
    server
    .post("/api/admin/register")
    .send(admin)
    .expect("Content-type", /json/)
    .expect(200)
    .end(function(err, res){
      expect(res.status).to.eql(200);
      expect(res.error).to.eql(false);
      done()
    });
  });
});

describe("Admin unit test",function(){
  it("should login new admin",function(done){
    let admin = {
      email : "newadmin@gmail.com", 
      password : "newpassword"
    }
    server
    .post("/api/admin/login")
    .send(admin)
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.eql(200);
      expect(res.error).to.eql(false);
      expect(res.body[0].id_admin).to.eql(14);
      done();
    });
  });
});

