import Order, { OrderModel } from "../src/models/Order";
import * as mongoose from "mongoose";
import * as util from "util";

import * as request from "supertest";
import * as app from "../src/app";

const chai = require("chai");
const expect = chai.expect;

describe("Tests for Order model", () => {

  it("should be invalid if orderId is empty", (done) => {
    const order = new Order();

    order.validate((err) => {
      expect(err.errors.orderId.message).equal("Path `orderId` is required.");
      done();
    });
  });

  it("should be invalid if customerAddress is empty", (done) => {
    const order = new Order();

    order.validate((err) => {
      expect(err.errors.customerAddress.message).equal("Path `customerAddress` is required.");
      done();
    });
  });

  it("should be invalid if orderedItem is empty", (done) => {
    const order = new Order();

    order.validate((err) => {
      expect(err.errors.orderedItem.message).equal("Path `orderedItem` is required.");
      done();
    });
  });

  it("should be invalid if companyName is empty", (done) => {
    const order = new Order();

    order.validate((err) => {
      expect(err.errors.companyName.message).equal("Path `companyName` is required.");
      done();
    });
  });

});
