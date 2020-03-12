let _ = require("lodash");
const HelperFunctions = require('../helpers/functions');

let rushingObj = require("../data/rushing.json");
// Information of a football players rushing statistics is acquired here

class FootballRushingModel {

    constructor(data) {
        // array of players rushing statistics
        this.data = data;
        
        // total amount of players
        this.total = this.data.length;

        // supported Sortable Fields
        this.sortableFields = ['ID', 'Player', 'Yds', 'Lng', 'TD'];

        // support all fields
        // this.sortableFields = Object.keys(this.data[0]);
    }

    getDataJSON = (limit, offset, sort, orderBy, playerfilter) => {
        return new Promise((resolve, reject)=>{
            // console.log(limit, offset, sort, orderBy, playerfilter);
            
            // ensure this.data is immutable
            let org_data = _.cloneDeep(this.data);

            // don't bother running filter function if playerfilter is ''
            let filteredData = (playerfilter)? HelperFunctions.filterStringItems('Player', org_data, playerfilter) : org_data;
            
            // sort the data if the field isn't the default
            let sortedData = (sort !== "ID")? HelperFunctions.sortData(sort, filteredData, orderBy) : filteredData;

            let limitedData = HelperFunctions.getArraySubset(sortedData, limit, offset);

            // console.log('Length: ', limitedData.length);

            // should add total number of resources available in the collection
            // this is used by the clients
            let responseObj = {};
            
            responseObj.data = limitedData;
            responseObj.total = this.total;

            resolve(responseObj);            
        });
    };

    isField = (field) => {
       return this.sortableFields.includes(field);
    };

}

// a single instance of this class should exist (Singleton Design)
module.exports = new FootballRushingModel(rushingObj);