const Vehicle = require("../models/Vehicle");
const server = require("../app");

let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("Vehicles", () => {
  it("/vehicles should return 200 status code", (done) => {
    chai
      .request(server)
      .get("/vehicles")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.have.a("object");

        done();
      });
  });

  it("/vehicles?currentPage for paginations should return 200 status code", (done) => {
    chai
      .request(server)
      .get("/vehicles?currentPage=2")
      .end((err, res) => {
        res.should.have.status(200);

        done();
      });
  });

  it("It should have a `data` and `totalItems` property", (done) => {
    chai
      .request(server)
      .get("/vehicles")
      .end((err, res) => {
        res.body.should.have.property("data");
        res.body.should.have.property("totalItems");

        done();
      });
  });

  it("It should return array and number values", (done) => {
    chai
      .request(server)
      .get("/vehicles")
      .end((err, res) => {
        res.body.data.should.have.a("array");
        res.body.totalItems.should.have.a("number");

        done();
      });
  });
});
