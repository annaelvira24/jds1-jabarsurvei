var supertest = require("supertest");
const expect = require("chai").expect;

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:5000");

// UNIT test begin

describe("Admin unit test",function(){

  // #1 should return home page

  it("should return first admin",function(done){

    // calling home page api
    server
    .get("/api/admin/1")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      expect(res.status).to.eql(200);
      // Error key should be false.
      expect(res.error).to.eql(false);

      expect(res.body[0].id_admin).to.eql(1);
      expect(res.body[0].email).to.eql('example@gmail.com');

      done();
    });
  });

});

describe("Admin unit test",function(){

  // #1 should return home page

  it("should successfully login",function(done){

    let admin = {
      email : "example@gmail.com", 
      password : "password123"
    }
    // calling home page api
    server
    .post("/api/admin/login")
    .send(admin)
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      expect(res.status).to.eql(200);
      // Error key should be false.
      expect(res.error).to.eql(false);
      expect(res.body[0].id_admin).to.eql(1);
      done();
    });
  });

});