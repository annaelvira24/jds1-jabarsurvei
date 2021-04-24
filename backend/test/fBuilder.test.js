process.env.NODE_ENV = 'test';
var supertest = require("supertest");
const expect = require("chai").expect;

var server = supertest.agent("http://localhost:5001");

describe("Form builder unit test",function(){
  it("should return question by id_survey",function(done){
    server
    .get("/api/fBuilder/findById/1")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.eql(200);
      expect(res.error).to.eql(false);
      expect(res.body[0].details).to.eql('{"type": "text","required": true,"label": "Nama lengkap","className": "form-control","name": "text-1617374044157"}');
      expect(res.body[1].details).to.eql('{"type": "select","required": true,"label": "Jenis Kelamin","className": "form-control","name": "select-1617374054717","multiple": false,"values": [{"label": "Laki-laki","value": "Laki-laki","selected": true},{"label": "Perempuan","value": "Perempuan","selected": false}]}');
      expect(res.body[2].details).to.eql('{"type": "textarea","required": true,"label": "Ceritakan kesan Anda terhadap layanan Jabar Digital Service","className": "form-control","name": "textarea-1617374090840"}');
      done();
    });
  });
});

describe("Form builder unit test",function(){
  it("should return title by id_survey",function(done){
    server
    .get("/api/fBuilder/getTitleById/1")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.eql(200);
      expect(res.error).to.eql(false);
      expect(res.body[0].survey_title).to.eql("Survey Kepuasan Layanan");
      done();
    });
  });
});

describe("Form builder unit test",function(){
  it("should create new form",function(done){
    const survey = {
      id_survey: 1,
      details: '[{"type":"header","label":"Header"},{"type":"paragraph","label":"Paragraf"}]'
    }

    server
    .post("/api/fBuilder/createform")
    .send(survey)
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      expect(res.text).to.be.eq("OK")
      done();
    });
  });
});