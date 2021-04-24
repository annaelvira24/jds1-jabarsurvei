process.env.NODE_ENV = 'test';
var supertest = require("supertest");
const expect = require("chai").expect;

const app = require("../server");

var server = supertest.agent("http://localhost:5001");

describe("List survey unit test",function(){
  it("should return all survey list",function(done){
    server
    .get("/api/listSurvey/findAll")
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

describe("List survey unit test",function(){
  it("should successfully return first survey by id",function(done){
    server
    .get("/api/listSurvey/id/1")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.eql(200);
      expect(res.error).to.eql(false);
      expect(res.body[0].survey_title).to.eql("Survey Kepuasan Layanan");
      expect(res.body[0].decription).to.eql("");
      done();
    });
  });
});

describe("List survey unit test",function(){
  it("should successfully return first survey by link",function(done){
    server
    .get("/api/listSurvey/link/uxEJF3p7l0cOeqK2DJxGU")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.eql(200);
      expect(res.error).to.eql(false);
      expect(res.body[0].survey_title).to.eql("Survey Kepuasan Layanan");
      expect(res.body[0].decription).to.eql("");
      done();
    });
  });
});

describe("List survey unit test",function(){
  it("should successfully return list survey count",function(done){
    server
    .get("/api/listSurvey/count")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.eql(200);
      expect(res.error).to.eql(false);
      expect(res.body.count).to.not.eql(0);
      done();
    });
  });
});

describe("List survey unit test",function(){
  it("should successfully create new survey",function(done){
    let survey = {
      id_admin : 2,
      survey_title : "Test Survey",
      decription : "Test Description",
      status : 'Aktif'
    }
    server
    .post("/api/listSurvey/create")
    .send(survey)
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.body.data.id_survey).to.eql(14)
      done();
    });
  });
});
