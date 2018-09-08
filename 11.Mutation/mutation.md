
# Mutation

Mutation queries modify data in the data store. It can be used to insert, update, or delete data.  
Mutations are defined as a part of the schema. Mutation query can  return a value.

The syntax of a mutation query is as given below:

```javascript
mutation{
    someEditOperation(dataField:"valueOfField"):returnType
 }
```

## Illustration

Let us understand how one can add new student record into the datastore using a  mutation query.

### Step 1: Create a project folder by the name mutation-app

- Add a **package.json** file with following dependencies

```javascript
{
  "name": "mutation-app",
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

- use `npm install` to install all the dependencies.

### Step 2: Create a **schema.graphql** file

In the project folder, define a mutation type in this file as shown below

```javascript

  type Mutation {
    createStudent(collegeId:ID,firstName:String,lastName:String):String
}

```

Note that the function returns a String type this will be the unique identifier(ID) which will be generated after creating a student.

### Step 3: Create data access layer

- Create a folder **data** and add two files  students.json and colleges.json .Add some sample data as below in colleges.json

 ```javascript
 [
    {
      "id": "col-101",
      "name": "AMU",
      "location":"Mumbai",
       "rating":5.0
    },
    {
        "id": "col-102",
        "name": "CUSAT",
        "location": "Pune",
        "rating":4.5
      }
  ]



 ```

Using mutation query we will add new students in **students.json** file . The collegId should match with the data in colleges.json file.

- Make a **db.js** file in project folder . Write code to access the files using notarealdb package

  ```javascript
  const { DataStore } = require('notarealdb');

  const store = new DataStore('./data');

  module.exports = {
    students:store.collection('students'),
    colleges:store.collection('colleges')
  };

  ```

Create a DataStore object which will be pointing to the *data* folder where json files are kept. Export students and colleges as a collection .

### Step 3:Create a resolver.js file

In the mutation-app project folder.Add a resolver for the Mutation type . In mutation function we will point to students collection in the datastore . To add a new student invoke the create method in students collection as given below.

```javascript
 const db = require('./db')
  const Mutation ={
    createStudent:(root,args,context,info)=>{

        return db.students.create({collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName})

    }

}

module.exports = {Mutation}
```

The *args* object will contain the parameters which are passed in the query.The create method of students collection will return the id of newly created object.

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

//college Id should be matched with data from colleges.json for easy retrieval
mutation {
  createStudent(collegeId:"col-2",firstName:"Tim",lastName:"George")
}


```

The above query will create a student object in **student.json** file. The query will return a unique identifier. The response of the query will be as shown below.

```javascript

  {
  "data": {
    "createStudent": "SkQtxYBUm"
  }
}

```

To verify if the student object is created,since a student is created we can use the `studentById` query, you can also open the **students.json** file from **data** folder to verify the id.  
To use `studentById`  query do the following

- edit schema as below

```javascript
type Query {
    studentById(id:ID!):Student
}


type Student {
    id:ID!
    firstName:String
    lastName:String
    password:String
    collegeId:String

}

````

- edit the resolver file as below.

```javascript

   studentById:(root,args,context,info) => {
     //args will contain parameter passed in query
        return db.students.get(args.id);
  }


```

This will be the query get student by the unique id returned from the mutation query.

```javascript
{
    studentById(id:"SkQtxYBUm"){
    id
    fullName
  }
}

```

response from server

```javascript

{
  "data": {
    "studentById": {
      "id": "SkQtxYBUm",
      "fullName": "Tim:John"
    }
  }
}


```

## Returning an Object in mutation

 Its a best practice to return an object in mutation.Say for example, the client application wants to fetch student and college details.In this case rather than making two different requests, we can create a query that returns and object that contains students and their college details.

step 1: add new method  named `addStudent_returns_object` in mutation type of **schema.graphql**

```javascript

 type Mutation {
  //new method
  addStudent_returns_object(collegeId:ID,firstName:String,lastName:String):Student

  createStudent(collegeId:ID,firstName:String,lastName:String):String
}

```

step 2: update the **resolvers.js** file as below

```javascript

     const Mutation ={
    createStudent:(root,args,context,info)=>{

        return db.students.create({collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName})

    },
    // new resolver function
    addStudent_returns_object:(root,args,context,info)=>{
      const id=  db.students.create({collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName})

            return db.students.get(id)


    }

}


```

step 3: start the server and type the request query in GraphiQL

```javascript
mutation {
  addStudent_returns_object(collegeId:"col-101",firstName:"Susan",lastName:"George"){
    id
    fullName
    college{
      id
      name
    }
  }
}

```

response will be as below , this query add a new student as well as retrieves that object along with college object. so this saves round trips to the server

```javascript
  {
  "data": {
    "addStudent_returns_object": {
      "id": "rklUl08IX",
      "fullName": "Susan:George",
      "college": {
        "id": "col-101",
        "name": "AMU"
      }
    }
  }
}

```
