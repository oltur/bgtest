import * as request from "supertest";
import * as app from "../src/app";
import { OrderModel } from "../src/models/Order";

describe("GET /api", () => {
  it("should return 200 OK", () => {
    return request(app).get("/api")
      .expect(200);
  });
});

describe("Tests for /api/order/import", () => {
  it("should return 404 NotFound for GET", () => {
    return request(app).get("/api/order/import")
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
      .post("/api/order/import")
      .send(data)
      .set("Content-type", "application/json")
      .set("X-Test", "yes")
      .expect(200 + data.length);
  });
});

describe("Tests for /api/order", () => {
  it("should return 404 NotFound for GET", () => {
    return request(app).get("/api/order")
      .expect(404);
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
