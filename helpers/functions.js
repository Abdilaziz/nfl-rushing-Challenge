// let _ = require("lodash");

let HelperFunctions = {
    isNumber(value) {
        return value !== undefined && typeof(value) === 'number' && !isNaN(value);
    },
    isString(value) {
        return value !== undefined && typeof(value) === 'string';
    },
    // filter an array of objects that contain the input string (query)
    filterStringItems(field, arr, query) {
        return arr.filter(function(el) {
            return el[field].toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
    },
    // sort an array of objects based on the field
    sortData(field, arr, orderBy) {  
        if (orderBy === 'asc') {
            return arr.sort((a, b) => {
                let parsedA = parseFloat(a[field]);
                let parsedB = parseFloat(b[field]);
                if (!this.isNumber(parsedA) || !this.isNumber(parsedB) ) {
                    // if either one isnt a number, take a and b to be strings
                    // for a field like Lng, a value of "34T", it would still be parsed as 34
                    let x = a[field].toLowerCase();
                    let y = b[field].toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                }
                else {
                    return parsedA - parsedB;
                }
            });
        }
        else {
            return arr.sort((a, b) => {
                let parsedA = parseFloat(a[field]);
                let parsedB = parseFloat(b[field]);
                if (!this.isNumber(parsedA) || !this.isNumber(parsedB) ) {
                    // if either one isnt a number, take a and b to be strings
                    // for a field like Lng, a value of "34T", it would still be parsed as 34
                    let x = a[field].toLowerCase();
                    let y = b[field].toLowerCase();
                    if (x > y) {return -1;}
                    if (x < y) {return 1;}
                    return 0;
                }
                else {
                    return parsedB - parsedA;
                }
            });
        }
    },
    // get a section of the input array
    getArraySubset(arr, limit, offset) {
        return arr.splice(offset, limit)
    },
};


module.exports = HelperFunctions;