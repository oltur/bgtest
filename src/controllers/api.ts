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
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
  res.render("api/index", {
    title: "API Examples"
  });
};

/**
 * GET /api/facebook
 * Facebook API example.
 */
export let getFacebook = (req: Request, res: Response, next: NextFunction) => {
  const token = req.user.tokens.find((token: any) => token.kind === "facebook");
  graph.setAccessToken(token.accessToken);
  graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err: Error, results: graph.FacebookUser) => {
    if (err) { return next(err); }
    res.render("api/facebook", {
      title: "Facebook API",
      profile: results
    });
  });
};