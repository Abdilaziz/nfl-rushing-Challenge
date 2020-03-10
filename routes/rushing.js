var express = require('express');
var rushingRouter = express.Router();

let rushingObj = require("../data/rushing.json");

rushingRouter.route('/')
.all(function(req, res, next) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get(function(req, res, next) {
  res.json(rushingObj);
});

module.exports = rushingRouter;
