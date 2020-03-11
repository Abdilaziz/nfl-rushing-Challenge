
let rushingObj = require("../data/rushing.json");
// Information of a football players rushing statistics is acquired here

class Rushing {

    constructor(data) {
        // array of players rushing statistics
        this.data = data;
        this.total = data.length;
    }

    getData = (limit, offset) => {
        // console.log(limit, offset);
        let limitedData = [];
        let index = offset;
        
        while (index < this.total && limitedData.length < limit) {
            limitedData.push( this.data[index] )
            index++;
        }
        // console.log('Length: ', limitedData.length);

        // should add total number of resources available in the collection
        // this is used by the clients
        let responseObj = {};
        responseObj.data = limitedData;
        responseObj.total = this.total;

        return responseObj;
    };

    getAllData = () => {
        return this.data;
    };

}

Footballrushing = new Rushing(rushingObj);

module.exports = Footballrushing;