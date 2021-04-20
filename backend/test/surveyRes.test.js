process.env.NODE_ENV = 'test';
var supertest = require("supertest");
const expect = require("chai").expect;

var server = supertest.agent("http://localhost:5001");

describe("Survey result unit test",function(){
  it("should return survey result by id",function(done){
    server
    .get("/api/surveyRes/getResult/uxEJF3p7l0cOeqK2DJxGU")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.eql(200);
      expect(res.error).to.eql(false);
      expect(res.body.length).to.not.eql(0);
      done();
    });
  });
});

describe("Survey result unit test",function(){
  it("should return survey result by link",function(done){
    server
    .get("/api/surveyRes/getAnswerByLink/uxEJF3p7l0cOeqK2DJxGU")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.eql(200);
      expect(res.error).to.eql(false);
      expect(res.body.length).to.not.eql(false);
      done();
    });
  });
});