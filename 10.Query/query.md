
# Query

A GraphQL operation can be either a read or write operation. A GraphQL query is used to read or fetch values while a mutation is used to write or post values.In either cases, the operation is a simple string that a GraphQL server can parse and respond to with data in a specific format. The popular response format that is usually used for mobile and web applications is JSON.

The syntax to define a query is

```javascript

//syntax 1
query query_name{ someField }

//syntax 2
{ someField }
```

An  example query would look like

```javascript

//query with name myQuery
query myQuery{
    greeting
 }

// query without any name
{
  greeting
}

```

From the example it is clear that query keyword is optional.

GraphQL queries help to reduce over fetching of data.Unlike a Restful API, GraphQL allows a user to restrict fields that should be fetched from the server. This means smaller queries and lesser traffic over the network. This in turn reduces the response time.

## Illustration 1: Query Student model with a Custom Field

In this example we have set of students stored in a json file each student model has fields like firstName,lastName , id  but no fullName field available. We will discuss here how to make a query to retrieve fullName of all students. For this we need to create fullName field in schema and  fullName field in resolver . Let us see how to do this illustration.

### Step 1 : Download and Install required dependencies for the project

- Create a folder named query-app .Change your directory to query-app from the terminal.
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

- Type the command `npm install` on the terminal to install all the dependencies

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

Note that there is no fullName field in the the students.json file. However, we need to fetch the fullname of the student via a query. The fullName, in this case will be a **custom field** that isn't available with the data source.

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
    fullName:String
}


```

### Step 5: Create Resolver

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

  //for each single student object returned,resolver is invoked
const Student={
    fullName:(root,args,context,info)=>{
        return root.firstName+":"+root.lastName
    }
  }

module.exports = {Query,Student}


```

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
   students{
    id
    fullName
  }
}

```

The response for the  query will be as given below

```javascript
{
  "data": {
    "students": [
      {
        "id": "S1001",
        "fullName": "Mohtashim:Mohammad"
      },
      {
        "id": "S1002",
        "fullName": "Kannan:Sudhakaran"
      },
      {
        "id": "S1003",
        "fullName": "Kiran:Panigrahi"
      }
    ]
  }
}

```

## Illustration 2: Nested Query

Let us create a nested query for fetching the student details and their college details. We will work with the same project folder.

### Step 1: Add Colleges data

- Add **colleges.json** file to the **data** folder.This file will hold a collection of colleges.

```javascript
[
    {
      "id": "col-101",
      "name": "AMU",
      "location": "Uttar Pradesh",
       "rating":5.0
    },
    {
        "id": "col-102",
        "name": "CUSAT",
        "location": "Kerala",
        "rating":4.5
      }
  ]
  
```

### Step 2: Edit the Schema

- The schema file already has the student field.Let us add a field college and define its type.

```javascript

type College {
    id:ID!
    name:String
    location:String
    rating:Float
}

type Student {
    id:ID!
    firstName:String
    lastName:String
    fullName:String
    college:College
}

```

### Step 3: Modify the Data Access Code

- In current **db.js** add a collection that points to the  colleges json file. The  code will be as  given below

```javascript
const { DataStore } = require('notarealdb');
const store = new DataStore('./data');
module.exports = {
  students:store.collection('students'),
  colleges:store.collection('colleges')
};

```

### Step 4: Modify the **resolvers.js**

- We need to add a `college` resolver function  as below. The college resolver function will be executed for each student object returned.The `root` parameter of resolver in this case will contain student.

```javascript
const Student={
    fullName:(root,args,context,info)=>{
        return root.firstName+":"+root.lastName
    },
    college:(root)=>{
      return db.colleges.get(root.collegeId);
   }
}

module.exports = {Query,Student}

```

The resolver returns college of each student by calling the get method of college collection and  passing the collegeId.
We have assoication realtionship between Student and College through the collegeId.

### Step 5: Test the application

Open the terminal window,navigate to the project folder. Type the command -`npm start`.Launch the browser and enter the url `http://localhost:9000/graphiql`. Enter the following query in the GraphiQL window

```javascript
    {
  students{
    id
    firstName
    college {
      id
      name
      location
      rating
    }
  }
}

```

The response for the query will be as given below-

```javascript

{
  "data": {
    "students": [
      {
        "id": "S1001",
        "firstName": "Mohtashim",
        "college": {
          "id": "col-102",
          "name": "CUSAT",
          "location": "Kerala",
          "rating": 4.5
        }
      },
      {
        "id": "S1002",
        "firstName": "Kannan",
        "college": {
          "id": "col-101",
          "name": "AMU",
          "location": "Uttar Pradesh",
          "rating": 5
        }
      },
      {
        "id": "S1003",
        "firstName": "Kiran",
        "college": {
          "id": "col-101",
          "name": "AMU",
          "location": "Uttar Pradesh",
          "rating": 5
        }
      }
    ]
  }
}



```

## What is Query Variable

If a query has some dynamic values to be passed , then represent these dynamic values using variables. Hence, the query can be reused by the client applications .

### Illustration

### Step1 : Edit schema file

 Add a sayHello field which takes a string parameter and returns a string.The name values will be dynamic in client application.

 ```javascript

 type Query  {
    sayHello(name:String!):String
}

 ```

### Step 2: Edit resolver file

Add a sayHello resolver which takes parameter as below .

```javascript
sayHello:(root,args,context,info)=> `Hi ${args.name} GraphQL server says Hello to you!!`
```

### Step 3: Declare query variable in GraphiQL

- Variable is declared with `$` followed by name of variable
- Variable `$myname_Variable` is used with a named query syntax . The query `myQuery` takes string value and passes it on to `sayHello` as shown below.

```javascript

query myQuery($myname_Variable:String!){

   sayHello(name:$myname_Variable)
}

```

- Set the value for the $myname_Variable as a JSON object in the **Query Variables** section of the GraphiQL client.

```javascript
 {
  "myname_Variable": "Mohtashim"
 }
```

response will look like the following.

 ```javascript
    {
  "data": {
    "sayHello": "Hi Mohtashim GraphQL server says Hello to you!!"
  }
}

 ```

 ![1_variable_syntax](https://user-images.githubusercontent.com/9062443/45154943-eb25e300-b1f6-11e8-93bc-df86cf41cae8.png)

## How to use Query Variable with Enum
  
  Let us see how to use a query variable when field parameter is of enum type.

### Step 1: Edit Schema.graphql file

```graphql
enum ColorType {
   RED
   BLUE
   GREEN
}

type Query {
   setFavouriteColor(color:ColorType):String
}

```

The setFavouriteColor function takes enum as input and returns a string value.

### Step 2: Edit Resolvers.js file

The resolver function setFavouriteColor takes root and args.
The enum value passed to function at runtime can be accessed through args parameter.

```javascript

setFavouriteColor:(root,args)=>{
        return  "Your Fav Color is :"+args.color;

    }
```

### Step 3: Declare a query variable in GraphiQL

query is named `query_to_setColor` which takes a variable of the named `color_variable` of the type ColorType.This variable is passed on to method `setFavouriteColor`

```javascript
query query_to_setColor($color_variable:ColorType)
{
  setFavouriteColor(color:$color_variable)
}

```

In the query variable section of GraphiQL type the following code.

```javascript
 {
  "color_variable":"RED"
}

```

response is shown below

```javascript
{
  "data": {
    "setFavouriteColor": "Your Fav Color is :RED"
  }
}

```

![1_variable_syntax_enum](https://user-images.githubusercontent.com/9062443/45158771-a607ae00-b202-11e8-8569-8821b8eb5d4e.png)