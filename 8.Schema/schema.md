
# Schema

A GraphQL schema is at the center of any GraphQL server implementation and describes the functionality available to the clients which connect to it.

Since GraphQL is a specification for a server runtime, we can use any language to create a GraphQL schema and build an interface around it.

The GraphQL runtime layer, which can be written in any language, defines a generic graph based schema to publish the capabilities of the data service it represents. Client applications
can query the schema within its capabilities. This approach decouples clients from servers
and allows both of them to evolve and scale independently.

Let us create  simple application to understand schema . this application will create schema for querying  list of students from the server . The student data will be stored in a flat file and we will use a node module called **notarealdb** to fake a database and read from flat file .

step 1 : create a folder named schema-app , change your directory to schema-app from terminal .Add a file package.json

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

type the command `npm install` on the terminal to install all the dependencies . Now lets add a **data** folder where our flat files will be stored . Lets create database for students first so create students.json file inside data folder .

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

step 2: create a respository module to convert students.json as a collection in the current applicaiton . we will add a *db.js* file in *schema-app* folder .

```javascript

const { DataStore } = require('notarealdb');
const store = new DataStore('./data'); // data folder will contain students.json file and other flat files 

module.exports = {
  
  students:store.collection('students') // read the students.json file
};



```

step 3: Lets create a schema **schema.graphql** file in the project folder *schema-app*

The root of the schema will be **Query** type , in the hello world example we have already used this . With in this query we have two fields on is greeting with data type String and other will be a list of students . Since student data is a complex data type we are using an object type as discussed in TypeSystem chapter.

Id cannot be nullable so we are using the syntax `DataType!` by default all fields are nullable

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

step 4:
Once the client request for a list of students we need a resolver function to handle this so lets create a file **resolvers.js** to the project folder. Resolvers will be discussed in detail in another section

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

step 5: Now lets run the application by creating **server.js** . We read the file schema.graphql and convert into string using 'utf-8' and storing in variable typeDefs , this is similar to the helloword example we did before , only difference is as the schema get bigger we are creating and storing in separate file *schema.graphql* and resover functions can get bigger so in file *resolvers.js*

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

Now execute using `npm start`  , once server is started open the browser and type as given below

![1_student_query](https://user-images.githubusercontent.com/9062443/44244618-714f9a80-a1f2-11e8-84dd-d948ca0e0913.png)