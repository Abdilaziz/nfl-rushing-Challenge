const express = require('express');
const rushingRouter = express.Router();
const bodyParser = require('body-parser');

// use body-parser to validate JSON data sent by clients
// checks that the Content-Type header matches the request body
// bodyParser.json(option)
// Lets you limit the Content-Type, Size, more
rushingRouter.use(bodyParser.json());

let rushingObj = require("../data/rushing.json");

rushingRouter.route('/')
.get( (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(rushingObj);
})
.post( (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /rushing');
})
.put( (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /rushing');
})
.patch( (req, res, next) => {
  res.statusCode = 403;
  res.end('PATCH operation not supported on /rushing');  
})
.delete( (req, res, next) => {
  res.statusCode = 403;
  res.end('DELETE operation not supported on /rushing');
});

rushingRouter.route('/:playerID')
.get( (req, res, next) => {
  res.statusCode = 403;
  res.end('GET operation not supported on /rushing/:playerID');
})
.post( (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /rushing/:playerID');
})
.put( (req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /rushing/:playerID');
})
.patch( (req, res, next) => {
  res.statusCode = 403;
  res.end('PATCH operation not supported on /rushing/:playerID');  
})
.delete( (req, res, next) => {
  res.statusCode = 403;
  res.end('DELETE operation not supported on /rushing/:playerID');
});


module.exports = rushingRouter;
