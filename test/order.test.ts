import * as request from "supertest";
import * as app from "../src/app";
import Order, { OrderModel } from "../src/models/Order";

describe("Tests for Order model", () => {
  it("should be invalid if companyName is empty", function (done) {
    const order = new Order();

    order.validate(function (err) {
      expect(err.errors.companyName.message).toEqual("Path `companyName` is required.");
      done();
    });
  });
});

describe("Tests for /api/importorders", () => {
  it("should return 404 NotFound for GET", () => {
    return request(app).get("/api/importorders")
      .expect(404);
  });

  it("should recognise test data", () => {

    const data: OrderModel[]
      = [
        { orderId: 1, companyName: "a", customerAddress: "aa", orderedItem: "aaa" },
        { orderId: 2, companyName: "b", customerAddress: "bb", orderedItem: "bbb" },
        { orderId: 3, companyName: "c", customerAddress: "cc", orderedItem: "ccc" }
      ];

    return request(app)
      .post("/api/importorders")
      .send(data)
      .set("Content-type", "application/json")
      .set("X-Test", "yes")
      .expect(200 + data.length);
  });
});

describe("Tests for /api/order", () => {
  it("should return 404 NotFound for PUT", () => {
    return request(app).put("/api/order")
      .expect(404);
  });

  it("should accept GET request for single item", () => {

    return request(app)
      .get("/api/order/1")
      .set("Content-type", "application/json")
      .set("X-Test", "yes")
      .expect(200 + 1);
  });

  it("should accept POST request", () => {

    const data: OrderModel
      = { orderId: 1, companyName: "a", customerAddress: "aa", orderedItem: "aaa" };

    return request(app)
      .post("/api/order")
      .send(data)
      .set("Content-type", "application/json")
      .set("X-Test", "yes")
      .expect(200 + 1);
  });
});
