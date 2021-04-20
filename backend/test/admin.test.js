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