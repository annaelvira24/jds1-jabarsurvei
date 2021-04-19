var supertest = require("supertest");
const expect = require("chai").expect;

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:5001");


// describe("Generate link unit test create link",function(){
//     it("should not return error",function(done){
    
//         let data_id = {
//         id_survey : 2, 
//         id_admin : 3
//         }
//         server
//         .post("/api/surveyLink/createLink")
//         .send(data_id)
//         .expect("Content-type",/json/)
//         .expect(200) // THis is HTTP response
//         .end(function(err,res){
//         // HTTP status should be 200
//         expect(res.status).to.eql(200);
//         // Error key should be false.
//         expect(res.error).to.eql(false);
//         done();
//         });
//     });
    
// });

describe("Generate link unit test find link by id",function(){
  
    it("should return link",function(done){
      server
      .get("/api/surveyLink/1")
      .expect("Content-type",/json/)
      .expect(200) // THis is HTTP response
      .end(function(err,res){
        // HTTP status should be 200
        expect(res.status).to.eql(200);
        // Error key should be false.
        expect(res.error).to.eql(false);
  
        expect(res.body[0].randomlink).to.eql('uxEJF3p7l0cOeqK2DJxGU');
  
        done();
      });
    });
  
  });

