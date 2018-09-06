
# Resolver

Resolver is a collection of functions that generates response for a  GraphQL query. Simply put, a resolver acts as a GraphQL query handler.Every resolver function in a GraphQL schema accepts four positional arguments as given below:

`fieldName:(root, args, context, info) => { result }`

Sample resolver functions are shown below.

```javascript
//resolver function  with no parameters and returning string
greeting:()=>{
        return "hello from  TutorialsPoint !!!"
    }

//resolver function with no parameters and returning list
 students:()=>db.students.list()

//resolver function with arguments and returning object
  studentById:(root,args,context,info) => {
      return db.students.get(args.id);
    }

```

|Sr No |  arguments   |  Description
|:----:|:---------|:-------------
| 1  |  root | The object that contains the result returned from the resolver on the parent field
|2| args | An object with the arguments passed into the field in the query
|3|context|This is an object shared by all resolvers in a particular query
|4|info| it contains information about the execution state of the query, including the field name, path to the field from the root

 **Resolver Result Format**  
  Resolvers in GraphQL can return different types of values:

|Sr No |  arguments   |  Description
|:----:|:---------|:-------------
| 1| null or undefined |this indicates the object could not be found.
|2| array |  this is only valid if the schema indicates that the result of a field should be a list
|3|promise|resolvers often do asynchronous actions like fetching from a database or backend API, so they can return promises
|4|scalar or object |  a resolver can also return other values

## Illustration

Let us create a simple application to understand resolver . This application will create schema for querying a student by Id from the server . The student data will be stored in a flat file and we will use a node module called notarealdb to fake a database and read from flat file .

### Step 1 : Download and Install required dependencies for the project

- Create a folder named resolver-app .Change your directory to resolver-app from the terminal.
- Add a file package.json. Add the following code to the package.json file.

```javascript

{
  "name": "schema-app",
  "private": true,
  "license": "MIT",
  "scripts": {
    "start": "nodemon --ignore data/ server.js"
  },
  "dependencies": {
    "apollo-server-express": "^1.4.0",
    "body-parser": "1.18.2",
    "cors": "2.8.4",
    "express": "4.16.3",
    "graphql": "^0.13.2",
    "graphql-tools": "^3.1.1",
     "notarealdb": "0.2.2"
  },
  "devDependencies": {
    "nodemon": "1.17.1"
  }
}

```

- Type the command npm install on the terminal to install all the dependencies

### Step 2: Create a Flat file Database

Add a **data** folder where our flat files will be stored .Create **students.json** file inside data folder . This will act as the Student database.Add contents as following

```javascript
   [
     {
        "id": "S1001",
        "firstName":"Mohtashim",
        "lastName":"Mohammad",
        "email": "mohtashim.mohammad@tutorialpoint.org",
        "password": "pass123",
        "collegeId": "col-102"
      },
      {
        "id": "S1002",
        "email": "kannan.sudhakaran@tutorialpoint.org",
        "firstName":"Kannan",
        "lastName":"Sudhakaran",
        "password": "pass123",
        "collegeId": "col-101"
      },
      {
        "id": "S1003",
        "email": "kiran.panigrahi@tutorialpoint.org",
        "firstName":"Kiran",
        "lastName":"Panigrahi",
        "password": "pass123",
        "collegeId": "col-101"
      }
  ]


```

### Step 3: Create Data Access Layer

Create a **db.js** file in resolver-app folder . Add the following code to this file.

```javascript
  const { DataStore } = require('notarealdb');
const store = new DataStore('./data'); /* data folder will contain students.json file and other flat files*/

module.exports = {
  
  students:store.collection('students') /* read the students.json file*/
};


```

Here we are reading students.json file as a in memory collection using DataStore .Its easy to manipulate collections.To access the students collections outside the module we need to export it using module.exports.

### Step 4: Create a schema

Add **schema.graphql** file in the project folder **resolver-app** and add the following code

```javascript

type Query {
    greeting:String
    students:[Student]
    studentById(id:ID!):Student
}


type Student {
    id:ID!
    firstName:String
    lastName:String
    password:String
    collegeId:String

}


```

The schema file shows user can query for greeting,students and studentById. To retrieve students with specific id we use data type `ID!` which shows a non nullable unique identifier field.The students field returns an array of students and greeting returns a simple string value.

### Step 5: Create Resolver

Create a file **resolvers.js** in the project folder and add the following code

```javascript

const db = require('./db')

const Query = {
   //resolver function for greeting
    greeting:()=>{
        return "hello from  TutorialsPoint !!!"
    },
   //resolver function for students returns list
   students:()=>db.students.list(),

    //resolver function for studentbyId
   studentById:(root,args,context,info) => {
     //args will contain parameter passed in query
        return db.students.get(args.id);
  }

}
module.exports = {Query}

```

Note studentById takes in three parameters as discussed in this chapter , the studentId can be retrieved from `args` , root will contain the `Query` object itself. To return a specific student , we need to call get method with id  parameter in the students collection.

Here greeting , students ,studentById are the resolvers that handle the query .students resolver function returns a list of students from the data access layer.To access resolver functions outside the module Query object has to be exported using module.exports

## Step 6: Run the application

- Create a  **server.js** and add the following code.

```javascript
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const db = require('./db');

const port = 9000;
const app = express();

//loading type definitions from schema file
const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})

//loading resolvers
const resolvers = require('./resolvers')

//binding schema and resolver
const {makeExecutableSchema}=require('graphql-tools')
const schema = makeExecutableSchema({typeDefs , resolvers})

//enabling cross domain calls and form post
app.use(cors(), bodyParser.json());

//enabling routes
const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express')
app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))

//registering port
app.listen(port, () => console.info(`Server started on port ${port}`));


```

- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client to test the application.

- Open the browser and type the url `http://localhost:9000/graphiql` . Type the following query in the editor.

```javascript

{
  studentById(id:"S1001"){
    id
    firstName
    lastName
  }
  
}

```

output will be as shown below

```javascript
{
  "data": {
    "studentById": {
      "id": "S1001",
      "firstName": "Mohtashim",
      "lastName": "Mohammad"
    }
  }
}


```