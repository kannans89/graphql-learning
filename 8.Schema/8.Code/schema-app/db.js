
const { DataStore } = require('notarealdb');
const store = new DataStore('./data'); // data folder will contain students.json file and other flat files 

module.exports = {
  
  students:store.collection('students') // read the students.json file
};
