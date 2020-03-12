const express = require('express');
const rushingRouter = express.Router();
const bodyParser = require('body-parser');
let _ = require("lodash");

const FootballRushingService = require('../service/rushing');

// use body-parser to validate JSON data sent by clients
// checks that the Content-Type header matches the request body
// bodyParser.json(option)
// Lets you limit the Content-Type, Size, more
rushingRouter.use(bodyParser.json());

rushingRouter.route('/')
.all((req, res, next) => {
  next();
})
.get( (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');


  let limit = req.query.limit;
  let offset = req.query.offset;
  let sort = req.query.sort;
  let orderBy = req.query.orderBy;
  let playerfilter = req.query.playerFilter;

  // validation of query params is done in the service
  FootballRushingService.getData(limit,offset, sort, orderBy, playerfilter)
  .then((data)=> {
    res.json(data);
  })
  .catch(next);
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
