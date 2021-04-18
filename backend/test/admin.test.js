process.env.NODE_ENV = 'test';
var supertest = require("supertest");
const expect = require("chai").expect;


const app = require("../server");


// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:5001");


// UNIT test begin
describe("Admin unit test",function(){

  it("should return first admin",function(done){
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

// const supertest = require("supertest");
// const assert = require('assert');
// const app = require("../server");

// describe("GET /api/admin/1", function() {
//   it("it should has status code 200", function(done) {
//     supertest(app)
//       .get("/api/admin/1")
//       .expect(200)
//       .end(function(err, res){
//         if (err) done(err);
//         done();
//       });
//   });
// });