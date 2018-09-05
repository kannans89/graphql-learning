
# Schema

A GraphQL schema is at the core of any GraphQL server implementation. It describes the functionality available to the client applications that connect to it. We can use any programming language to create a GraphQL schema and build an interface around it.

The GraphQL runtime defines a generic graph based schema to publish the capabilities of the data service it represents. Client applications an query the schema within its capabilities. This approach decouples clients from servers
and allows both of them to evolve and scale independently.

In this tutorial, we are using Apollo server for executing GraphQL queries. The makeExecutableSchema function in Apollo helps you to bind a schema and a resolvers. The syntax for using the makeExecutableSchema function is as given below-  

## makeExecutableSchema Function Syntax

The makeExecutableSchema function takes a single argument of an `Object` type.

```javascript
import { makeExecutableSchema } from 'graphql-tools';

const jsSchema = makeExecutableSchema({
  typeDefs,
  resolvers, // optional
  logger, // optional
  allowUndefinedInResolve = false, // optional
  resolverValidationOptions = {}, // optional
  directiveResolvers = null, // optional
  schemaDirectives = null,  // optional
  parseOptions = {},  // optional
  inheritResolversFromInterfaces = false  // optional
});

```

|Sr No |  parameter  |  Description
|:----:|:--------|:------------------
|   1  |   typeDefs|is a required argument and should be an GraphQL schema language string or array of GraphQL schema language strings.
|    2 | resolvers |  optional argument (empty object by default) and should be an object
| 3 | logger | is an optional argument, which can be used to print errors to the server console
| 4 | parseOptions | is an optional argument which allows customization of parse when specifying typeDefs as a string.
| 5| allowUndefinedInResolve |  is true by default. When set to false, causes your resolve functions to throw errors if they return undefined
| 5 |  resolverValidationOptions | optional argument which accepts an object with boolean properties
| 6| inheritResolversFromInterfaces| optional   boolean argument to check resolvers object inheritance.

**Illustration**
Let us create a simple application to understand schema . This application will create schema for querying  list of students from the server . The student data will be stored in a flat file and we will use a node module called **notarealdb** to fake a database and read from flat file .

Step 1 :  Download and Install required dependencies for the project  

a. Create a folder named **schema-app** .Change your directory to **schema-app** from the terminal.   
b. Add a file **package.json**. Add the following code to the **package.json** file. 

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

c.Type the command `npm install` on the terminal to install all the dependencies . 

Step 2: Create a Flat  file Database  
a.Add a **data** folder where our flat files will be stored .Create **students.json** file inside data folder . This will act as the Student database. 

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

Step 3:  Create Data Access Layer. 
Create a  **db.js** file in **schema-app** folder . Add the following code to this file. 

```javascript

const { DataStore } = require('notarealdb');
const store = new DataStore('./data'); // data folder will contain students.json file and other flat files

module.exports = {
  
  students:store.collection('students') // read the students.json file
};



```

//explain code
Create a respository module to convert students.json as a collection.


Step 4: Create a schema **schema.graphql** file in the project folder **schema-app** and add the following code-

```javascript

type Query {
    greeting:String
    students:[Student]
}


type Student {
    id:ID!
    firstName:String
    lastName:String
    password:String
    collegeId:String

}

```

The root of the schema will be **Query** type . The query has two fields greeting and Students that return String and a list of students respectively . Student is declared as an Object type since it contains multiple fields.  The ID field is declared as non-nullable.

Step 5: Create a file **resolvers.js** in the project folder and add the following code-

```javascript

const db = require('./db')

const Query = {
    greeting:()=>{
        return "hello from  TutorialsPoint !!!"
    },
    students:()=>db.students.list()

}
module.exports = {Query}

```
In order to handle a client request for data from GraphQL, we need a resolver function.Resolvers will be discussed in detail in another section.

Step 6: Run the application
a. Create a  **server.js** and add the following code.

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
**explain code step (a)**

b. Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client to test the application.  
c. Open the browser and type the url `http://localhost:9000/graphiql` . Type the following query in the editor.
 
 ```javascript

{
  greeting
  students {
    id
    firstName
    lastName
  }
  
}

```
The query will display the output as shown below-  

![1_student_query](https://user-images.githubusercontent.com/9062443/44244618-714f9a80-a1f2-11e8-84dd-d948ca0e0913.png)


**Now lets run the application by  . We read the file schema.graphql and convert into string using 'utf-8' and storing in variable typeDefs , this is similar to the helloword example we did before , only difference is as the schema get bigger we are creating and storing in separate file *schema.graphql* and resover functions can get bigger so in file *resolvers.js** - add this to comment section  

**Note** : We can replace the students.json with a RESTful api call to retrieve student data or even a real database like mysql or mongodb. GraphQL becomes a thin wrapper around your original application layer to improve performance .

