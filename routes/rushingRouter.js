const express = require('express');
const rushingRouter = express.Router();
const bodyParser = require('body-parser');
const Footballrushing = require('../models/rushing');

// use body-parser to validate JSON data sent by clients
// checks that the Content-Type header matches the request body
// bodyParser.json(option)
// Lets you limit the Content-Type, Size, more
rushingRouter.use(bodyParser.json());



const MAX_LIMIT = 500; // max is used in order to stop heavy processing/DoS attacks
const DEFAULT_LIMIT = 50; // default if no limit query parameter is used

const DEFAULT_OFFSET = 0; // default offset if no query parameter is used

const DEFAULT_SORT = 'ID'; // Sort by id Field by default (same order as listed in JSON)
const DEFAULT_ORDERBY = 'asc'; // order is ascending by default

rushingRouter.route('/')
.all((req, res, next) => {
  next();
})
.get( (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  // Validate Query Params. Validation should be implemented elsewhere for reuse.

  let limit = DEFAULT_LIMIT;
  // if limit query param is defined, and is a valid number
  if (req.query.limit) {
    let parsedLimit = parseInt(req.query.limit);
    if (parsedLimit && parsedLimit > 0 && parsedLimit <= MAX_LIMIT) {
      limit = parsedLimit;
    }
  }

  let offset = DEFAULT_OFFSET;
  // if offset query param is defined, and is valid (no max)
  if (req.query.offset) {
    let parsedOffset = parseInt(req.query.offset);
    if (parsedOffset && parsedOffset >= 0) {
      offset = parsedOffset;
    }
  }

  let sort = DEFAULT_SORT;
  // if sorting query param is defined,
  if (req.query.sort) {
    let parsedSort = req.query.sort;
    if (Footballrushing.isField(parsedSort)) {
      sort = parsedSort;
    }
  }

  let orderBy = DEFAULT_ORDERBY;
  if (req.query.order_by && req.query.order_by === "desc" ) {
    orderBy = "desc";
  }

  res.json(Footballrushing.getData(limit,offset, sort, orderBy));
})
.post( (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /football/rushing');
})
.put( (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /football/rushing');
})
.patch( (req, res, next) => {
  res.statusCode = 403;
  res.end('PATCH operation not supported on /football/rushing');  
})
.delete( (req, res, next) => {
  res.statusCode = 403;
  res.end('DELETE operation not supported on /football/rushing');
});

rushingRouter.route('/:playerID')
.get( (req, res, next) => {
  res.statusCode = 403;
  res.end('GET operation not supported on /football/rushing/:playerID');
})
.post( (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /rushing/:playerID');
})
.put( (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /football/rushing/:playerID');
})
.patch( (req, res, next) => {
  res.statusCode = 403;
  res.end('PATCH operation not supported on /football/rushing/:playerID');  
})
.delete( (req, res, next) => {
  res.statusCode = 403;
  res.end('DELETE operation not supported on /football/rushing/:playerID');
});


module.exports = rushingRouter;