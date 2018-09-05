
# Resolver

Resolver is a collection of functions that generates response for a  GraphQL query. Simply put, a resolver acts as a GraphQL query handler.Every resolver function in a GraphQL schema accepts four positional arguments as given below:

`fieldName(root, args, context, info) { result }`

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

**each field has to fetch data from datastore .so there should be a function called resolver which will be called for each field and that will yield a result. The greeting field have a greeting resolver function and students field have another resolver function which calls backend and returns a list of students.**

## Passing parameter to a resolver

Now we need to retrieve student by their specific id . This unique id will be passed in the query , the return type will be a single student.
We need to first design the schema to get students by their id
  `studentById(id:ID!):Student`  , second change to be done is in
  the resolvers.

  ```javascript
       studentById:(root,args,context,info) => {
        return db.students.get(args.id);
      }
  ```

Graphiql query

```javascript
{
  studentById(id:"S1001"){
    id
    firstName
    lastName
  }
}

```

output

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

Following is the content of **package.json**

```javascript
{
  "name": "resolver-app",
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

Following is the content of **schema.graphql**

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
}


```

Following is the content of **resolvers.js**

```javascript


const db = require('./db')

const Query = {
    greeting:()=>{
        return "hello from resolver function"
    },
    students:()=>db.students.list(),
    studentById:(root,args,context,info) => {
        return db.students.get(args.id);
    }

}

module.exports = {Query}

```

Following is the content of **server.js**

```javascript
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const db = require('./db');

const port = 9000;

const app = express();


const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
const resolvers = require('./resolvers')

const {makeExecutableSchema}=require('graphql-tools')
const schema = makeExecutableSchema({typeDefs , resolvers})


app.use(cors(), bodyParser.json());


const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express')
app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))


app.listen(port, () => console.info(`Server started on port ${port}`));

```

Following is the content of **db.js**

```javascript

const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
  students:store.collection('students')
};

```

Following is the content of **data/students.json**

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
