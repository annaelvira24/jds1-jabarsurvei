process.env.NODE_ENV = 'test';
var supertest = require("supertest");
const expect = require("chai").expect;

const app = require("../server");

var server = supertest.agent("http://localhost:5001");

describe("Survey Fill unit test",function(){
  it("should return questions by link",function(done){
    server
    .get("/api/surveyFill/getSurvey/uxEJF3p7l0cOeqK2DJxGU")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.eql(200);
      expect(res.error).to.eql(false);

      expect(res.body[0].id_survey).to.eql(1);
      expect(res.body[0].survey_title).to.eql("Survey Kepuasan Layanan");
      expect(res.body[0].decription).to.eql("");

      expect(res.body[0].details).to.eql('{"type": "text","required": true,"label": "Nama lengkap","className": "form-control","name": "text-1617374044157"}');
      expect(res.body[1].details).to.eql('{"type": "select","required": true,"label": "Jenis Kelamin","className": "form-control","name": "select-1617374054717","multiple": false,"values": [{"label": "Laki-laki","value": "Laki-laki","selected": true},{"label": "Perempuan","value": "Perempuan","selected": false}]}');
      expect(res.body[2].details).to.eql('{"type": "textarea","required": true,"label": "Ceritakan kesan Anda terhadap layanan Jabar Digital Service","className": "form-control","name": "textarea-1617374090840"}');
      done();
    });
  });

});