let _ = require("lodash");

let rushingObj = require("../data/rushing.json");
// Information of a football players rushing statistics is acquired here

class Rushing {

    constructor(data) {
        // array of players rushing statistics
        this.data = data;
        this.total = this.data.length;
        this.sortableFields = ['ID', 'Player', 'Yds', 'Lng', 'TD'];
    }

    getData = (limit, offset, sort, orderBy) => {
        // console.log(limit, offset, sort);

        // deep clone the dataset (because it should be immutable)
        let sortedData = _.cloneDeep(this.data);
        
        // some JSON data types need to be validated.
        // some fields have mixed types 

        if (sort !== "ID") {
            if (typeof(sortedData[0][sort]) === "string" ) {
                if (orderBy === "asc") {
                    sortedData.sort((a, b)=>{
                        let x = a[sort].toLowerCase();
                        let y = b[sort].toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    });
                }
                else if (orderBy === "desc") {
                    sortedData.sort((a, b)=>{
                        let x = a[sort].toLowerCase();
                        let y = b[sort].toLowerCase();
                        if (x > y) {return -1;}
                        if (x < y) {return 1;}
                        return 0;
                    });
                }
            }
            else if (typeof(sortedData[0][sort]) === "number" ) {
                if (orderBy === "asc") {
                    sortedData.sort((a, b)=>{
                        return a[sort] - b[sort];
                    });
                }
                else if (orderBy === "desc") {
                    sortedData.sort((a, b)=>{
                        return b[sort] - a[sort];
                    });
                }
            }
        }

        let limitedData = [];
        let index = offset;
        
        while (index < this.total && limitedData.length < limit) {
            limitedData.push( sortedData[index] )
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

    isField = (field) => {
       return this.sortableFields.includes(field);
    };

}

Footballrushing = new Rushing(rushingObj);

module.exports = Footballrushing;