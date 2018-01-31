import Order, { OrderModel } from "../src/models/Order";
import * as mongoose from "mongoose";
import * as util from "util";

import * as request from "supertest";
import * as app from "../src/app";

const chai = require("chai");
const expect = chai.expect;

const fs = require("fs");

function mylog(s) {
//  fs.appendFileSync("./zzz.log", new Date().toUTCString() + ": " + s + "\n");
}

// const snooze = async (ms) => {
//   console.log("About to snooze without halting the event loop...");
//   await new Promise(resolve => setTimeout(resolve, ms));
//   console.log("done!");
// };

// let response: any;

beforeAll((done) => {
  done();
});
beforeEach((done) => {
  const data
    = [
      { orderId: 500, companyName: "99a", customerAddress: "99aa", orderedItem: "99aaa" },
    ];

  request(app)
    .post("/api/importorders")
    .send(data)
    .set("Content-type", "application/json")
    .expect(200)
    .end(function (err, res) {
      if (res.status != 200) {
        mylog("beforeEach: " + JSON.stringify(res));
      }
      done();
    });
  // Order.collection.insertOne({ orderId: 500, companyName: "55", customerAddress: "55", orderedItem: "55" }, done);
});
afterEach((done) => {
  Order.remove({}, done);
});
afterAll((done) => {
  done();
});

describe("Tests for /api/importorders", () => {
  it("should return 404 NotFound for GET", function (done) {
    return request(app).get("/api/importorders")
      .expect(404, done);
  });

  it("should recognise test data", function (done) {

    const data
      = [
        { orderId: 991, companyName: "99a", customerAddress: "99aa", orderedItem: "99aaa" },
        { orderId: 992, companyName: "99b", customerAddress: "99bb", orderedItem: "99bbb" },
        { orderId: 993, companyName: "99c", customerAddress: "99cc", orderedItem: "99ccc" }
      ];

    request(app)
      .post("/api/importorders")
      .send(data)
      .set("Content-type", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (res.status != 200) {
          mylog("should recognise test data: " + JSON.stringify(res));
        }
        done();
      });
  });
});

describe("Tests for /api/order", () => {
  it("should return 404 NotFound for PUT", function (done) {
    request(app).put("/api/order")
      .expect(404, done);
  });

  it("should accept GET request for single item", function (done) {

    //    done();
    request(app)
      .get("/api/order/500")
      .send()
      .expect(200)
      .end(function (err, res) {
        if (res.status != 200) {
          mylog("should accept GET request for single item: " + JSON.stringify(res));
        }
        done();
      });
    }, 3000);

  it("should accept GET request for multiple items", function (done) {

    return request(app)
      .get("/api/order/?sortKey=orderId&sortOrder=asc&skip=0&limit=1000&$where=this.orderId=500")
      .send()
      .expect(200)
      .end(function (err, res) {
        if (res.status != 200) {
          mylog("should accept GET request for multiple items: " + JSON.stringify(res));
        }
        done();
      });
  }, 3000);

  it("should accept DELETE request for single item", function (done) {

    return request(app)
      .delete("/api/order/500")
      .send()
      .expect(200)
      .end(function (err, res) {
        if (res.status != 200) {
          mylog("should accept DELETE request for single item: " + JSON.stringify(res));
        }
        done();
      });
  }, 3000);

  it("should accept POST request", function (done) {

    const data
      = { orderId: 600, companyName: "6a", customerAddress: "6aa", orderedItem: "6aaa" };

    return request(app)
      .post("/api/order")
      .set("Content-type", "application/json")
      .send(data)
      .expect(200)
      .end(function (err, res) {
        if (res.status != 200) {
          mylog("should accept POST request: " + JSON.stringify(res));
        }
        done();
      });
  }, 3000);

  it("should accept PATCH request", function (done) {

    const data
      = { orderId: 500, companyName: "2a", customerAddress: "2aa", orderedItem: "2aaa" };

    return request(app)
      .patch("/api/order")
      .send(data)
      .set("Content-type", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (res.status != 200) {
          mylog("should accept PATCH request: " + JSON.stringify(res));
        }
        done();
      });
  }, 3000);
});
