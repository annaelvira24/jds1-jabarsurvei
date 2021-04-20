process.env.NODE_ENV = 'test';
var supertest = require("supertest");
const expect = require("chai").expect;

const app = require("../server");

var server = supertest.agent("http://localhost:5001");

describe("Submit unit test",function(){
  it("should return answer count",function(done){
    server
    .get("/api/submit/count")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.eql(200);
      expect(res.error).to.eql(false);

      expect(res.body.count).to.eql(9);
      done();
    });
  });

});