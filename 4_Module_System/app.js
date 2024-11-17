const allPeople = require("./people");
const _ = require("lodash"); // lodash is a js library for common programming tasks

console.log(_.last(allPeople.people)); // will find the last element of the array
