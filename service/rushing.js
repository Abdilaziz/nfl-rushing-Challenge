let _ = require("lodash");
const FootballRushingModel = require('../models/rushing');
const HelperFunctions = require('../helpers/functions');

// Use data from client and from Model and return data that should be used by the User.

const MAX_LIMIT = 500; // max is used in order to stop heavy processing/DoS attacks
const DEFAULT_LIMIT = 50; // default if no limit query parameter is used

const DEFAULT_OFFSET = 0; // default offset if no query parameter is used

const DEFAULT_SORT = 'ID'; // Sort by id Field by default (same order as listed in JSON)
const DEFAULT_ORDERBY = 'asc'; // order is ascending by default
const DEFAULT_PLAYERFILTER = ''; // no filter by default

let FootballRushingService = () => {
    return {
        getData: (limit, offset, sort, orderBy, playerfilter) => {
            // we want inputs to be immutable
            let query_limit = _.cloneDeep(limit);
            query_limit = parseInt(query_limit);
            if (!HelperFunctions.isNumber(query_limit) || query_limit <= 0 || query_limit > MAX_LIMIT) {
                query_limit = DEFAULT_LIMIT;
            }

            let query_offset = _.cloneDeep(offset);
            query_offset = parseInt(query_offset);
            if (!HelperFunctions.isNumber(query_offset) || query_offset < 0 ) {
                query_offset = DEFAULT_OFFSET;
            }

            let query_sort = _.cloneDeep(sort);
            if(!HelperFunctions.isString(query_sort) || !FootballRushingModel.isField(query_sort)) {
                query_sort = DEFAULT_SORT;
            }

            let query_orderBy = _.cloneDeep(orderBy);
            if (!HelperFunctions.isString(query_orderBy) || query_orderBy !== "desc") {
                query_orderBy = DEFAULT_ORDERBY;
            }

            let query_playerfilter = _.cloneDeep(playerfilter);
            if (!HelperFunctions.isString(query_playerfilter)) {
                query_playerfilter = DEFAULT_PLAYERFILTER;
            }

            return new Promise((resolve, reject) => {
                FootballRushingModel
                .getDataJSON(
                    query_limit,
                    query_offset,
                    query_sort,
                    query_orderBy,
                    query_playerfilter)
                .then(resolve)
                .catch(reject);
            });
        },
    };
};


module.exports = FootballRushingService();