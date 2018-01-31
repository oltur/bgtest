"use strict";

import * as async from "async";
import * as request from "request";
import * as graph from "fbgraph";
import * as assert from "assert";
import { Response, Request, NextFunction } from "express";
import { default as Order, OrderModel } from "../models/Order";
import { IVerifyOptions } from "passport-local";
import { WriteError } from "mongodb";
import { Document } from "mongoose";

/**
 * POST /api/importorders
 * Imports the data into DB.
 */
export let postImportOrders = (req: Request, res: Response, next: NextFunction) => {
  const data: OrderModel[] = [];

  req.body.forEach((elem: any) => {
    data.push(elem);
  });

  Order.collection.insertMany(data)
    .then(doc => {
      assert.equal(data.length, doc.insertedCount);
      res.status(200);
      res.write("OK");
    })
    .catch(err => {
      res.status(500);
      res.write(err.toString());
    })
    .then(() => {
      res.send();
      next();
    });

};


/**
 * POST /api/order/:id
 * Creates an order.
 */
export let postOrder = (req: Request, res: Response, next: NextFunction) => {

  const data: OrderModel = req.body;

  Order.collection.insertOne(data)
    .then(doc => {
      assert.equal(1, doc.insertedCount);
      res.status(200);
      res.write("OK");
    })
    .catch(err => {
      res.status(500);
      res.write(err.toString());
    })
    .then(() => {
      res.send();
      next();
    });
};

/**
 * DELETE /api/order/1
 * Deletes an order by Id.
 */
export let deleteOrder = (req: Request, res: Response, next: NextFunction) => {

  Order.remove({ orderId: req.params.id })
    .then((doc: any) => {
      assert.equal(doc.result.n, 1, "No suitable orders found");
      res.status(200);
      res.write("OK");
    })
    .catch(err => {
      res.status(500);
      res.write(err.toString());
    })
    .then(() => {
      res.send();
      next();
    });
};

/**
 * GET /api/order/1
 * GETs an order by id.
 */
export let getOrder = (req: Request, res: Response, next: NextFunction) => {

  const orderId = parseInt(req.params.id);

  Order.findOne({ orderId: orderId }, ).exec()
    .then((data: OrderModel) => {
      assert.notEqual(data, undefined, "No order found");
      data.orderId = orderId;
      res.status(200);
      res.contentType("application/json");
      res.write(JSON.stringify(data));
    })
    .catch(err => {
      res.status(500);
      res.write(err.toString());
    })
    .then(() => {
      res.send();
      next();
    });
};

/**
 * PATCH /api/order/
 * Updates an order.
 */
export let putOrder = (req: Request, res: Response, next: NextFunction) => {

  Order.findOne({ orderId: parseInt(req.body.orderId) }).exec()
    .then((order: OrderModel) => {
      order.companyName = req.body.companyName || "";
      order.customerAddress = req.body.customerAddress || "";
      order.orderedItem = req.body.orderedItem || "";
      return order.save();
    })
    .then(() => {
      res.status(200);
      res.write("OK");
    })
    .catch(err => {
      res.status(500);
      res.write(err.toString());
    })
    .then(() => {
      res.send();
      next();
    });
};

/**
 * GET /api/order/
 * Searches for orders.
 * Example: http://localhost:3000/api/order/?sortKey=orderId&sortOrder=asc&skip=0&limit=1000&$where=this.companyName==='Tic-tac4'%26%26this.orderId>=112
 */
export let getOrderSearch = (req: Request, res: Response, next: NextFunction) => {

  const limit = parseInt(req.query.limit, 10) || 1000, // default limit to 1000 docs.
    skip = parseInt(req.query.skip, 10) || 0, // default skip to 0 docs
    sortKey = req.query.sortKey,
    sortOrder = req.query.sortOrder,
    query = req.query || {};

  // remove skip and limit from query to avoid false querying
  delete query.skip;
  delete query.limit;
  delete query.sortKey;
  delete query.sortOrder;

  const sort: any = {};
  sort[sortKey] = sortOrder === "asc" ? 1 : -1;
  // find data and get (with optional query, skip and limit)
  Order.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .exec()
    .then(docs => res.status(200)
      .set("Content-Type", "application/json")
      .write(JSON.stringify(docs)))
    .catch(err => res.status(500)
      .write(err.toString()))
    .then(() => {
      res.send();
      next();
    });
};

/**
 * GET /api/order/ordersCountPerItem/
 * Calculates how often each item has been ordered, in descending order.
 */
export let getCountPerItem = (req: Request, res: Response, next: NextFunction) => {

  Order.aggregate(
    [
      {
        $group: {
          _id: "$orderedItem",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
    ]
  )
    .then(docs => res.status(200)
      .set("Content-Type", "application/json")
      .write(JSON.stringify(docs)))
    .catch(err => res.status(500).write(err.toString()))
    .then(() => {
      res.send();
      next();
    });
};

