const express = require('express');
const rushingRouter = express.Router();
const bodyParser = require('body-parser');
const { parseAsync } = require('json2csv');
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

  // query params
  let download = req.query.download; // response is a csv. Limit and offset are ignored if download is csv
  let limit = req.query.limit; // number of records wanted
  let offset = req.query.offset; // offset of the number of records wanted
  let sort = req.query.sort; // sort by what column/key
  let orderBy = req.query.orderBy; // order by asc or desc
  let playerfilter = req.query.playerFilter; // filter by player name

  // validation of query params is done in the service
  FootballRushingService.getData(limit,offset, sort, orderBy, playerfilter, download)
  .then((respObj)=> {
    if (download !== "csv") {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(respObj);
    }
    else {
      // should be modeled differently for flexibility
      let listOfObj = respObj.data;
      let objKeys = [];
      if (listOfObj.length !== 0) {
        // assumes all objects in the list have the same keys/columns
        objKeys = Object.keys(listOfObj[0]);
      }
      const opts = { objKeys };
      // async create the CSV
      // due to memory and blocking js event loop.
      // requied for consitent memory footprint and supporting high concurrency
      parseAsync(listOfObj, opts)
      .then(csv => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.attachment();
        res.send(csv);
      })
      .catch(err => {
        next(err);
      });
    }
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
