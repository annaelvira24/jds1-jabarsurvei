process.env.NODE_ENV = 'test';
var supertest = require("supertest");
const expect = require("chai").expect;

var server = supertest.agent("http://localhost:5001");

describe("Survey admin unit test",function(){
  it("should return all certain admin survey list",function(done){
    server
    .get("/api/surveyAdmin/1")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.eql(200);
      expect(res.error).to.eql(false);
      expect(res.body.length).to.not.eql(0);
      expect(res.body[0].id_survey).to.eql(13);
      expect(res.body[0].survey_title).to.eql("Test survey");
      done();
    });
  });
});

describe("Survey admin unit test",function(){
  it("should update survey status",function(done){
    let survey = {
      id_survey : 3,
      status : 'Non-Aktif'
    }
    server
    .post("/api/surveyAdmin/updateStatus")
    .send(survey)
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.eql(200);
      expect(res.error).to.eql(false);
      done();
    });
  });
});