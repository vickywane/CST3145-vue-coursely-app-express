const server = require("../app");

let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

describe("Comparison", () => {
  it("/compare without `id` should return 500 status code", (done) => {
    chai
      .request(server)
      .get("/compare/1")
      .end((err, res) => {
        res.should.have.status(500);

        done();
      });
  });

  it("/compare with invalid `id` should return 500 status code", (done) => {
    chai
      .request(server)
      .get("/compare/1XXXXXX-XXXXX-XXXX")
      .end((err, res) => {
        res.should.have.status(500);

        done();
      });
  });

  it("/compare with nonexistent `id` should return 404 status code", (done) => {
    chai
      .request(server)
      .get("/compare/c89d66a8-e2f9-48b1-848f-624153a16608")
      .end((err, res) => {
        console.log(res.body);

        res.should.have.status(404);

        done();
      });
  });
});
