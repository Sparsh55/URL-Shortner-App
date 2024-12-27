import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js"; // Adjust the path to your main app file
const should = chai.should();

chai.use(chaiHttp);

describe("API Tests", () => {
  it("should POST all items", (done) => {
    chai
      .request(app)
      .post("/api/url")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should GET all items", (done) => {
    chai
      .request(app)
      .get("/api/url/:alias")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should GET all items", (done) => {
    chai
      .request(app)
      .get("/api/url/analytics/:alias")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should GET all items", (done) => {
    chai
      .request(app)
      .get("/api/auth/google")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should GET all items", (done) => {
    chai
      .request(app)
      .get("/api/auth/google/callback")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("should POST a new item", (done) => {
    const item = {
      name: "Sample Item",
      description: "This is a sample item",
    };
    chai
      .request(app)
      .post("/api/items")
      .send(item)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("name").eql("Sample Item");
        done();
      });
  });
});
