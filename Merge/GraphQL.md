
# GraphQL Tutorial

GraphQL is an open source server side technology . GraphQL was developed by facebook to optimise RESTful API calls. It is a data query language as well as an execution engine.

This tutorial will introduce you to the fundamental concepts of  GraphQL. In this tutorial we will :

- Implement GraphQL API using Apollo server  
- Test GraphQL API using GraphiQL  
- Build ReactJS(with Apollo Client library) and jQuery client applications to consume the API

# Audience

This tutorial is created for developers who have worked on JavaScript applications based on Client-Server architecture. After completing this tutorial, you will be able to build moderately complex GraphQL APIs for mobile and web applications.

# Prerequisites

 This course is based on NodeJs and Express . So if you have a basic understanding of NodeJS  then it will be easy to learn GraphQL. For frontend integration of GraphQL we will be using ReactJs and Jquery .Illustrations in this tutorial uses EcmaScript 6(ES6) syntax . So  any knowledge in these areas can be helpful.

<div style="page-break-after: always;"></div>


# Why GraphQL

RESTful APIs follow a resource-oriented approach that is clear and well structured. But when the data gets more and more complex, the routes get longer and longer, and sometimes it isn’t even possible to fetch the data you want with a single request. This is where GraphQL comes into play.
GraphQL structures data in the form of a graph.It has a powerful query syntax for traversing, retrieving, and modifying data.

## 1. Ask for what you need,get exactly that

Send a GraphQL query to your API and get exactly what you need, nothing more and nothing less. GraphQL queries always return predictable results. Applications using GraphQL are fast and stable.Unlike Restful services, these applications can restrict data that should be fetched from the server. The following example will help you understand this better.

Let us consider a business object Student with the attributes id , firstName ,lastName and collegeName .Suppose a mobile application needs to fetch only the firstName and id.If we design a REST endpoint like `/api/v1/students`, it will end up fetching data for all the fields for a student object. This means, data is overfetched by the RESTful service.

This problem can be solved by using GraphQL. Consider the following sample GraphQL query given below.

```javascript
{
  students{
    id
    firstName
  }
  
}

```

The above query will return values only for the id and firstname fields in the response.The query will not fetch values for other attributes of the student object. The response of the query illustrated above will be as shown below:

```javascript
{
  "data": {
    "students": [
      {
        "id": "S1001",
        "firstName": "Mohtashim"
      },
      {
        "id": "S1002",
        "firstName": "Kannan"
      }
    ]
  }
}

```

## 2. Get many resources in a single request

GraphQL queries  helps to smoothly retrieve associated business objects ,while typical REST APIs require loading from multiple URLs. GraphQL APIs fetch all the data your application needs in a single request. Applications using GraphQL can be quick even on slow mobile network connections.  

Let us consider one more business object College which has the attributes name and location. The Student business object has an association relationship with the College object. If we were to use a REST API in order to fetch the details of students and their college we will end up making two requests to server like `/api/v1/students` and `/api/v1/colleges` .This will lead to under fetching of data , that is less data fetched in each request .So mobile applications are forced to make multiple calls to server to get the desired data .

However, the mobile application can fetch details for both -Student and College objects in a single request by using GraphQL. The GraphQL query for the same will be

```javascript
    {
    students{
        id
        firstName
        lastName
        college{
        name
        location
        }
    }
    }
```

The response will contain exactly the fields in the query .

```javascript
{
  "data": {
    "students": [
      {
        "id": "S1001",
        "firstName": "Mohtashim",
        "lastName": "Mohammad",
        "college": {
          "name": "CUSAT",
          "location": "Kerala"
        }
      },
      {
        "id": "S1002",
        "firstName": "Kannan",
        "lastName": "Sudhakaran",
        "college": {
          "name": "AMU",
          "location": "Uttar Pradesh"
        }
      },
      {
        "id": "S1003",
        "firstName": "Kiran",
        "lastName": "Panigrahi",
        "college": {
          "name": "AMU",
          "location": "Uttar Pradesh"
        }
      }
    ]
  }
  }

```

## 3. Describe what’s possible with a type system

GraphQL queries are based on fields and their associated data types.GraphQL is strongly typed.If there is type mismatch in a GraphQL query, server applications return clear and helpful error messages. This helps in smooth debugging and easy detection of bugs by client applications.GraphQL also provides client side libraries that can help in reducing explicit data conversion and parsing.

 An example of the the Student and College data types is as given below.

```graphql

type Query {
    students:[Student]
}

    type Student {
    id:ID!
    firstName:String
    lastName:String
    fullName:String
    college:College
   }

   type College {
    id:ID!
    name:String
    location:String
    rating:Float
    students:[Student]
 }


  ```

## 4. Move faster with powerful developer tools

GraphQL provides rich developer tools for documentation and testing queries. **GraphiQL** is an excellent tool which generates documentation of the query and its schema. It also gives a query editor to test GraphQL APIs. It also provides intelligent code completion capability while building queries.

<div style="page-break-after: always;"></div>


# Environment Setup

To execute the examples in this tutorial you will need-

- A computer running Linux, macOS, or Windows.
- A web browser, preferably the latest version of Google Chrome.
- A recent version of Node.js installed. The latest LTS version is recommended
- Visual Studio Code with extension *GraphQL for VSCode* installed or any code editor of your choice

## How to Build a GraphQL server with nodejs

### Step 1 : Verify Node and NPM versions
  
  After Installing nodejs , verify the version of node and npm using following commands on the terminal

```javascript
C:\Users\Admin>node -v
v8.11.3

C:\Users\Admin>npm -v
5.6.0

```

### Step 2: Create a project folder and open in VSCode

The root folder of project can be named **test-app** and open the folder using visual studio code editor by following the instructions.

```javascript

C:\Users\Admin>mkdir test-app
C:\Users\Admin>cd test-app
C:\Users\Admin\test-app>code .

```

### Step 3: Create  **package.json** and install the dependencies

- Create a package.json file which will contain all the dependencies of the GraphQL server application.

```javascript
{
  "name": "test-app",
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
    "node-datetime": "^2.1.0",
    "notarealdb": "0.2.2",
    "express-jwt": "5.3.1",
    "jsonwebtoken": "8.2.0"
  },
  "devDependencies": {
    "nodemon": "1.17.1"
  }
}

```

- Install the dependencies by using the command as given

```javascript
C:\Users\Admin\test-app>npm install
```

### Step 4 : Create flat file database in data folder

This tutorial will be using flat files to store and retrieve data.Create a folder **data** and add two files **students.json** and **colleges.json** . Following will be the contents of the files.

- following is colleges.json

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

- following is students.json

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

## Step 5: Create a data access layer

We need a datastore which will load the **data** folder contents. The datastore should contain students and colleges collection variables. So any time application need to get data they can use these collection variables.

- Create file **db.js** with in the project folder ,this will be our datastore

```javascript

const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
  students:store.collection('students'),
  colleges:store.collection('colleges')
};

```

## Step 6: Create schema file schema.graphql

Create a schema file in the current project folder  and add following contents.

```javascript
  type Query  {
    test: String
}  

```

## Step 7: Create resolver file resolvers.js

Create a resolver file in the current project folder  and add following contents.

```javascript

const Query = {
  
       test: () =>  'Test Success , GraphQL server is up & running !!'
}

module.exports = {Query}

```

## Step 8: Create **Server.js** and Configure GraphQL

```javascript

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const db = require('./db');

const port = process.env.PORT || 9000;
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

### Step 9 : Run the application and test with GraphiQL

- verify the folder structure of project test-app

```javascript

test-app /

      -->package.json
      -->db.js
      -->data
             students.json
             colleges.json
      -->resolvers.js
      -->schema.graphql
      -->server.js

```

- run the command `npm start`.

```javascript
    C:\Users\Admin\test-app>npm start  
```

- The server is running in 9000 port so we can test the application using GraphiQL tool . Open browser and type the url `http://localhost:9000/graphiql` . Type the following query in the editor.

```javascript
  {
  test
  }

```

The response from the server is will be as below.

```javascript
  {
  "data": {
    "test": "Test Success , GraphQL server is running !!"
  }
}


```

![1_test_setup](https://user-images.githubusercontent.com/9062443/44847540-704a4e80-ac71-11e8-9bc2-d76fa69d822f.png)

<div style="page-break-after: always;"></div>


# Architecture

  GraphQL is a specification. It describes the behaviour of a GraphQL server. It is a set of guidelines that defines how requests and responses should be handled ,like  the supported protocols,format of the data that can be accepted by the server, the format of response returned by the server etc.Request made by a client to the GraphQL server is called a **Query**.
 Another important concept of GraphQL is its transport layer agnostics . It can be used with any available network protocol like TCP , websocket or any other transport layer protocol . It is also neutral to databases,so you can use it with relational or  NoSQL databases.

GraphQL Server can be deployed by using any of the three methods listed below:

1. GraphQL Server with connected database.
2. GraphQL server that integrates existing systems.
3. Hybrid approach .

## 1. GraphQL server with Connected Database

This Architecture is often used with new projects.This architecture has a GraphQL Server with an integrated database.
On the receipt of  a Query,the server reads the request payload and fetches data from the database. This is called **resolving the query**. The response returned to the client adheres to the format specified in the official GraphQL specification.

![1_dbserver_02](https://user-images.githubusercontent.com/9062443/45077482-edab0e80-b10a-11e8-8336-0edc71c117f9.png)

In the above diagram,GraphQL server and the database is integrated on a single node. The client (desktop / mobile ) communicates with GraphQL server over HTTP. The GraphQL server processes the request, fetches data from the database and returns it to the client.

## 2. GraphQL server integrating existing systems

This approach is helpful for companies which have lecgacy infrastructure and different APIs .GraphQL can be used to unify microservices, leagcy infrastructure and third-party APIs in the existing system .

![2_legacy_systems_02](https://user-images.githubusercontent.com/9062443/45077483-ee43a500-b10a-11e8-80ee-8e168e2ac15c.png)

In the above diagram, a GraphQL API acts as an interface between the client and the existing systems.Client applications talk to the GraphQL server which in turn resolves the query.

## 3. Hybrid Approach

Finally we can combine the above two approaches and build a GraphQL server.
In this architecture when request is received by the GraphQL server , the server will resolve the request. It will either retrieve data from connected database or from the integrated API's . This is shown in the figure given below.

![3_hybrid_02](https://user-images.githubusercontent.com/9062443/45077485-ee43a500-b10a-11e8-85cc-0ae156054e89.jpg)

<div style="page-break-after: always;"></div>


# Application Components

This section discusses the different GraphQL components and how they communicate with each other. The entire application components can be distinguished as-

|Sr No |  Description              |
|:----:|:--------------------------|
| 1    | Server Side Components    |
| 2    | Client Side Components    |

## Server Side Components

 **GraphQL server** forms the core component on the server side .GraphQL server allows to parse the queries coming from graphql client applications. Apollo Server is most commonly used implementation of GraphQL specification. Other server programming components include the following.

|Sr No |  Server Essentials   | Description
|:----:|:-------------|:---------------------------
| 1    | Schema| A GraphQL schema is at the center of any GraphQL server implementation and describes the functionality available to the clients which connect to it.
| 2    | Query | A GraphQL query is the client application request to retrieve data from database or legacy API's
| 3    | Resolver|Resolvers provide the instructions for turning a GraphQL operation into data. They resolve the query to data by defining resolver functions.

## GraphQL Client

|Sr No |  tool              | Description
|:----:|:-------------------|:-----------
| 1    | GraphiQL | Browser based interface for editing and testing GraphQL queries , mutations
| 2    | ApolloClient| Best tool to build GraphQL client applications.Integrates well with all javascript front-end

![1_app_components](https://user-images.githubusercontent.com/9062443/45077716-86418e80-b10b-11e8-8774-ce2600d09022.jpg)

The above diagram shows a client server architecture . The web server is built on NodeJs and Express framework  . A request is made to the Apollo GraphQL Server by a ReactJS application (built using Apollo Client library) or a  GraphiQL browser application.
The query will be parsed and validated against a schema defined in the server. If the request schema passes the validation,then the associated resolver functions will be executed. The resolver will contain code to fetch data from an API or a database .

<div style="page-break-after: always;"></div>

  
# HelloWorld Example

We will create a simple API that returns a greeting message and access it using **GraphiQL** . This example is based on NodeJS,Express and Apollo server.
You will learn to put together all the concepts together .

## Step 1: Setting up Express

ExpressJS is a web application framework that helps you build websites, web applications.In this example,we will build a GraphQL API on top of the Express framework.

a. Create a folder **hello-world-server** navigate to the same folder from terminal.Add a **package.json** , and give a name to the package . Since this package will be used internally we shall declare it private.

```javascript
{
    "name":"hello-world-server",
    "private":true
}
```

b. Install the dependencies for Express server as shown

```javascript
C:\Users\Admin\hello-world-server>npm install express body-parser cors

```

*body-parser* is a middleware package which helps Express to handle HTTP Post requests efficiently.*cors* is another middleware package that handles cross-origin resource sharing.

c. Create a **server.js** file within the project folder and type the following in it.

```javascript

 const bodyParser = require('body-parser')
 const cors = require('cors')
 const express = require('express')
 const port = process.env.PORT|| 9000
 const app = express()
 //register middleware
 app.use(bodyParser.json() , cors())
 app.listen(port , ()=> console.log(`server is up and running at ${port}`))


```

d. To Verify if the Express server is up and running execute the following in the terminal window.

```javascript
 C:\Users\Admin\hello-world-server>node server.js
```

The following output will be diaplayed in the server console.This shows that the express server is running on port 9000

```javascript
server is up and running at 9000
```

e. open the browser and type `http://localhost:9000` you will get the following screen.
!["express"](https://user-images.githubusercontent.com/9062443/44002340-a6ab8992-9e5e-11e8-8907-81ec94ad27df.png "express")

To stop the server press *ctr+c*.

## Step 2: Install GraphQL and Apollo server

Now that Express is configured , the next step will be to download the following GraphQL dependencies-
a.  graphql
b. graphql-tools
c. apollo-server-express@1 modules
We shall use Apollo server v1.0 as it is a stable release
Type the following commands to install this dependencies.

```javascript
 C:\Users\Admin\hello-world-server>npm install graphql graphql-tools apollo-server-express@1
```

We can verify if these dependencies are installed successfully by checking the **package.json** file that we created previously.

```javascript
{
    "name": "hello-world-server",
    "private": true,
    "dependencies": {
        "apollo-server-express": "^1.4.0",
        "body-parser": "^1.18.3",
        "cors": "^2.8.4",
        "express": "^4.16.3",
        "graphql": "^0.13.2",
        "graphql-tools": "^3.1.1"
    }
}

```

## Step 3: Define the Schema

A GraphQL schema defines what kind of object can be fetched from a service, and what fields it has.The schema can be defined using **GraphQL Schema Definition Language**. Add the following code snippet in the **server.js** file.

```javascript

  // Adding Type Definitions

  const typeDefinition = `
     type Query  {
         greeting: String
     }
  `
```

Here, the query contains a `greeting` attribute that returns a `string` value.

## Step 4: Create a  Resolver

a.The next step is to add some code to process the request for greeting field. This is specified in a **resolver**. The structure of the resolver function must  match the schema. Add the following code snippet in the **server.js** file.

```javascript

  // Adding resolver

  const  resolverObject = {
      Query : {
          greeting: () => 'Hello GraphQL  From TutorialsPoint !!'
      }
  }
```

b. Bind the schema and resolver using `makeExecutableSchema`. This function is pre-defined in the graphql-tools module.Add the following code snippet in the **server.js** file.

```javascript
  const {makeExecutableSchema} = require('graphql-tools')
  const schema = makeExecutableSchema({typeDefs:typeDefinition , resolvers:resolverObject})

```

## Step 4: Define routes to fetch data from ReactJS / GraphiQL application

Add the following code snippet in the **server.js** file.

```javascript
  const {graphqlExpress , graphiqlExpress} = require('apollo-server-express')
    //create routes for graphql and graphiql
   app.use('/graphql',graphqlExpress({schema}))
   app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))


```

The `graphqlExpress` function helps to register the route `http://localhost:9000/graphql`. The ReactJS application can use this endpoint to query data. Similarly, the `graphqliExpress` function helps to register the route `http://localhost:9000/graphiql`. This will be used by the GraphiQL browser client to test the API.

The complete **server.js** code is as given below

```javascript

 const bodyParser = require('body-parser')
 const cors = require('cors')
 const express = require('express')
 const port = process.env.PORT||9000
 const app = express()
 app.use(bodyParser.json() , cors())

 const typeDefinition = `
 type Query  {
     greeting: String
 }`

 const  resolverObject = {
    Query : {
        greeting: () => 'Hello GraphQL  From TutorialsPoint !!'
    }
}
const {makeExecutableSchema} = require('graphql-tools')
 const schema = makeExecutableSchema({typeDefs:typeDefinition , resolvers:resolverObject})
const {graphqlExpress,graphiqlExpress} = require('apollo-server-express')
app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))
app.listen(port , ()=> console.log(`server is up and running ${port}`))

```

## Step 5: Start the Application

Execute **server.js** using Node.js .

```javascript
C:\Users\Admin\hello-world-server>node server.js
```

## Step 6: Test the GraphQL API

Open the  browser and type `http://localhost:9000/graphiql`

In the query tab of GraphiQL, enter the following -

```javascript
  {
  greeting
  }

```

The response from the server is given below.

```javascript
  {
  "data": {
    "greeting": "Hello GraphQL  From TutorialsPoint !!"
  }
}


```

The following image illustrates the response

!["graphiql"](https://user-images.githubusercontent.com/9062443/44010356-80865618-9ecf-11e8-8297-fe947766a200.png "graphql")

*note*: please ensure apollo server version 1.0 is used

<div style="page-break-after: always;"></div>


# Type System

GraphQL is a strongly typed language. Type System defines the various data types that can be used in a GraphQL application.The type system helps to define the schema , which is a contract between client and server . The commonly used GraphQL data types are as follows-

|Sr No |  Types              |  Description
|:----:|:--------------------------|:------------------
| 1    | Scalar    | Stores a single value
| 2    | Object     | Shows what kind of object can be fetched
| 3   | Query    | Entry point type to other specific types
| 4    | Mutation   | Entry point for data manipulation
| 5   | Enum   | Useful in a situation where you need the user to pick from a prescribed list of options

## Scalar Types

These are primitive data types. Scalar types can store only a  single value . The default scalar types that GraphQL offers are:

- **Int** :Signed 32 bit Integer
- **Float**: Signed double precision floating point value
- **String** : UTF‐8 character sequence
- **Boolean** :true or false
- **ID** : A unique identifier, often used as a unique identifier to fetch an object or as the key for a cache.

The Syntax for defining a scalar type is -

```javascript
   field: data_type
```

The snippet given below defines a field named greeting which returns String value

```javascript
   greeting: String
```

## Object Types

The object type is the most common type used in a schema and represents a group of fields. Each field inside an object type maps to another type, thereby allowing nested types. In other words, an object type is composed of multiple scalar types or Object types.
The Syntax for defining an Object type is

```javascript
type object_type_name
{
   field1: data_type
   field2:data_type
   ....
   fieldn:data_type
 }
```

Consider the following code snippet-  

```javascript
//Define an object type

type Student {
  stud_id:ID
  firstName: String
  age: Int
  score:Float
}


//Defining a GraphQL schema

type Query
{
 stud_details:[Student]
}

```

The example given above defines an object data-type  `Student`. The `stud_details` field in the root Query schema will return a list of Student objects.

## The Query type

A GraphQL query is to used to fetch data. It is similar to requesting a resource in REST-based APIs. Simply put, the Query type is the request send from a client application to the GraphQL server.GraphQL uses the Schema Definition Language(SDL) to define a Query.Query type is one of the many root-level types in GraphQL.

The syntax for defining a Query is as given below

 ```javascript
 type Query  {
     field1: data_type
     field2:data_type
     field2(param1:data_type,param2:data_type,...paramN:data_type):data_type
 }
 ```

Following is an example of defining a Query :

```javascript
 type Query  {
     greeting: String
 }
```

## Mutation Type

Mutations are operations sent to the server to create, update or delete data. These are analogous to the PUT, POST, PATCH and DELETE verbs to call REST-based APIs.

Mutation is one of the root-level data-types in GraphQL.The Query type defines the entry-points for data-fetching operations whereas the Mutation type specifies the entry points for data-manipulation operations.  

The syntax for defining a Mutation type is as given below

 ```javascript
 type Mutation {
     field1: data_type
     field2(param1:data_type,param2:data_type,...paramN:data_type):data_type
 }
 ```

For example, we can define a mutation type to add a new Student as given below:

```javascript
  type Mutation {
  addStudent(firstName: String, lastName: String): Student
}

```

### Enum Type  

An Enum is similar to a scalar type. Enums are useful in a situation where the value for a field must be from a prescribed list of options.

The syntax for defining an Enum type is -  

```javascript
  type enum_name{
  value1
  value2
}

```

Following snippet illustrates how an enum type can be defined -  

```javascript
  type Days_of_Week{
  SUNDAY
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
  SATURDAY
}

```

### List Type

Lists can be used to represent an array of values of a specific type. Lists are defined with a type modifier `[]` that wraps object types, scalars, and enums.

The following syntax can be used to define a  list type -

```javascript


field:[data_type]

```

The below example defines a list type `todos`  

```javascript
type Query {
  todos: [String]
}
```

### Non-Nullable Type  

By default, each of the core scalar types can be set to null. In other words, these types can either return a value of the specified type or they can have no value.To override this default and specify that a field must be defined,an exclamation mark (!) can be appended to a type.This ensures the presence of the value in results returned by the query.  
The following syntax can be used to define a non-nullable field

```javascript
field:data_type!
```

In the below example, `stud_id` is declared a mandatory field

```javascript
type Student {
    stud_id:ID!
    firstName:String
    lastName:String
    fullName:String
    college:College
}

```

<div style="page-break-after: always;"></div>


# Schema

A GraphQL schema is at the core of any GraphQL server implementation. It describes the functionality available to the client applications that connect to it. We can use any programming language to create a GraphQL schema and build an interface around it.

The GraphQL runtime defines a generic graph based schema to publish the capabilities of the data service it represents. Client applications an query the schema within its capabilities. This approach decouples clients from servers
and allows both of them to evolve and scale independently.

In this tutorial, we are using Apollo server for executing GraphQL queries. The makeExecutableSchema function in graphql helps you to bind the schema and resolvers. The syntax for using the makeExecutableSchema function is as given below

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
|   1  | typeDefs|This is a required argument. It represents a GraphQL query as a UTF-8 string.
|    2 | resolvers | This is an optional argument (empty object by default). This should be an object.
| 3 | logger | This is an optional argument. This can be used to print errors to the server console.
| 4 | parseOptions | This is an optional argument .It allows customization of parse when specifying typeDefs as a string.
| 5| allowUndefinedInResolve |  This is true by default. When set to false, causes your resolve functions to throw errors if they return undefined
| 5 |  resolverValidationOptions | This is an optional argument.It accepts an object with boolean properties
| 6| inheritResolversFromInterfaces| This is an optional argument. It accepts a boolean argument to check resolvers object inheritance.

## Illustration

Let us create a simple application to understand schema . This application will create schema for querying  list of students from the server . The student data will be stored in a flat file and we will use a node module called **notarealdb** to fake a database and read from flat file .

### Step 1 :  Download and Install required dependencies for the project  

- Create a folder named **schema-app** .Change your directory to **schema-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.

### Step 2: Create a schema

Add **schema.graphql** file in the project folder **schema-app** and add the following code

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

### Step 3: Create Resolvers

 Create a file **resolvers.js** in the project folder and add the following code

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

Here `greeting` and `students` are the resolvers that handle the query .`students` resolver function returns a list of students from the data access layer.To access resolver functions outside the module `Query` object has to be exported using module.exports

### Step 4: Run the application

- Create a  **server.js** file.Refer step 8 in the Environment Setup Chapter

- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client to test the application.Open browser and type the url `http://localhost:9000/graphiql`

Type the following query in the editor.

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

**Note** : We can replace the students.json with a RESTful api call to retrieve student data or even a real database like mysql or mongodb. GraphQL becomes a thin wrapper around your original application layer to improve performance .

<div style="page-break-after: always;"></div>


# Resolver

Resolver is a collection of functions that generates response for a  GraphQL query. Simply put, a resolver acts as a GraphQL query handler.Every resolver function in a GraphQL schema accepts four positional arguments as given below:

`fieldName:(root, args, context, info) => { result }`

An example of resolver functions are shown below.

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

- Create a folder named **resolver-app** .Change your directory to **resolver-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.

### Step 2: Create a schema

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

### Step 3: Create Resolvers

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

## Step 4: Run the application

- Create a server.js file.Refer step 8 in the Environment Setup Chapter.

- Execute the command `npm start` in the terminal.The server will be up and running on 9000 port.Here , we will use GraphiQL as a client to test the application.

Open browser and type the url `http://localhost:9000/graphiql`.
Type the following query in the editor.  

```javascript

{
  studentById(id:"S1001"){
    id
    firstName
    lastName
  }
  
}

```

The output will be as shown below

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


<div style="page-break-after: always;"></div>


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

In this example we have set of students stored in a json file each student model has fields like firstName,lastName , id  but no fullName field available. We will discuss here how to make a query to retrieve fullName of all students. For this we need to create fullName field in schema and  fullName field in resolver . Let us see how to do this in the illustration.

### Step 1 :  Download and Install required dependencies for the project

- Create a folder named **query-app** .Change your directory to **query-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.

### Step 2: Create a schema

Add schema.graphql file in the project folder query-app and add the following code-

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

Note that there is no fullName field in the the students.json file. However, we need to fetch the fullName of the student via a query. The fullName, in this case will be a **custom field** that isn't available with the data source.  

### Step 3: Create Resolver

Create a file resolvers.js in the project folder and add the following code

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

  //for each single student object returned,resolver is invoked
const Student={
    fullName:(root,args,context,info)=>{
        return root.firstName+":"+root.lastName
    }
  }

module.exports = {Query,Student}


```

## Step 4: Run the application

- Create a server.js file.Refer step 8 in the Environment Setup Chapter.  
- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client   to test the application.

Open browser and type the url `http://localhost:9000/graphiql` Type the following query in the editor.  

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

### Step 1: Edit the Schema

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

### Step 2: Modify the **resolvers.js**

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

### Step 3: Test the application

Open the terminal window,navigate to the project folder. Type the command -`npm start`.Launch the browser and enter the URL `http://localhost:9000/graphiql`. Enter the following query in the GraphiQL window

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

### Step 1 : Edit schema file

 Add a sayHello field which takes a string parameter and returns a string.The name values will be dynamic in client application.

 ```javascript

 type Query  {
    sayHello(name:String!):String
}

 ```

### Step 2: Edit resolver.js file

Add a sayHello resolver which takes parameter as below .

```javascript
sayHello:(root,args,context,info)=> `Hi ${args.name} GraphQL server says Hello to you!!`
```

### Step 3: Declare query variable in GraphiQL

- Variable is declared with `$` followed by name of variable for example `$myname_Variable`
- Next the variable declared `$myname_Variable` has to be used with a named query syntax . The query `myQuery` takes string value and passes it on to `sayHello` as shown below.

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

### Step 2: Edit resolvers.js file

The resolver function setFavouriteColor takes root and args.
The enum value passed to function at runtime can be accessed through args parameter.

```javascript

setFavouriteColor:(root,args)=>{
        return  "Your Fav Color is :"+args.color;

    }
```

### Step 3: Declare a query variable in GraphiQL

query is named `query_to_setColor` which takes a variable of the named `$color_variable` of the type ColorType.This variable is passed on to method `setFavouriteColor`

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


<div style="page-break-after: always;"></div>


# Mutation

Mutation queries modify data in the data store. It can be used to insert, update, or delete data.  
Mutations are defined as a part of the schema. Mutation query must  return a value.

The syntax of a mutation query is as given below:

```javascript
mutation{
    someEditOperation(dataField:"valueOfField"):returnType
 }
```

## Illustration

Let us understand how one can add new student record into the datastore using a  mutation query.

### Step 1: Download and Install required dependencies for the project

- Create a project folder by the name **mutation-app**.Change your directory to **mutation-app** from the terminal.  
- Follow steps 3 to 5 explained in the Environment Setup chapter.

### Step 2: Create a **schema.graphql** file

Add schema.graphql file in the project folder mutation-app and add the following code

```javascript
type Query {
  greeting:String
}

type Mutation {
    createStudent(collegeId:ID,firstName:String,lastName:String):String
}
  
```

Note that the function createStudent returns a String type this will be the unique identifier(ID) which will be generated after creating a student.

### Step 3: Create a resolver.js file

Create a file resolvers.js in the project folder and add the following code.  

```javascript
 const db = require('./db')
  const Mutation ={
    createStudent:(root,args,context,info)=>{

        return db.students.create({collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName})

    }

}


const Query = {
  greeting:()=>"hello"
}

module.exports = {Query,Mutation}
```

The mutation function points to students collection in the datastore . To add a new student invoke the create method in students collection. The *args* object will contain the parameters which are passed in the query.The create method of students collection will return the id of a newly created student object.

## Step 4: Run the application

- Create a server.js file.Refer step 8 in the Environment Setup Chapter.
- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client to test the application.  

Open browser and type the url `http://localhost:9000/graphiql` Type the following query in the editor.  

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

To verify if the student object is created,since a student is created we can use the `studentById` query, you can also open the **students.json** file from **data** folder to verify the id. To use `studentById`  query do the following

- Edit the schema.graphql as given below

```javascript
type Query {
    studentById(id:ID!):Student
}


type Student {
    id:ID!
    firstName:String
    lastName:String
    collegeId:String

}
````

- Edit the resolver.js file as given below.

```graphql
const db = require('./db')

const Query = {
    studentById:(root,args,context,info) => {
        return db.students.get(args.id);
    }

}
const Mutation ={
    createStudent:(root,args,context,info)=>{

        return db.students.create({collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName})

    }

}

module.exports = {Query,Mutation}

```

This will be the query to get student by the unique id returned from the mutation query.

```javascript
{
    studentById(id:"SkQtxYBUm"){
    id
    firstName
    lastName
  }
}

```

The response from server is given below-

```javascript

{
  "data": {
    "studentById": {
      "id": "SkQtxYBUm",
      "firstName": "Tim",
      "lastName":"George"
    }
  }
}


```

## Returning an Object in mutation

It is a best practice to return an object in mutation.Say for example, the client application wants to fetch student and college details.In this case rather than making two different requests, we can create a query that returns an object that contains students and their college details.

### Step 1: Edit schema file

Add a new method  named `addStudent_returns_object` in mutation type of **schema.graphql** . Lets give this feature of accessing college through the student . Add college type in schema file.

```javascript

 type Mutation {
   addStudent_returns_object(collegeId:ID,firstName:String,lastName:String):Student

  createStudent(collegeId:ID,firstName:String,lastName:String):String
}

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
    college:College
}

```

### Step 2: Update the **resolvers.js** file as below

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

//for each single student object returned,resolver is invoked
const Student={
    college:(root)=>{
        return db.colleges.get(root.collegeId);
    }
  }

module.exports = {Query,Student,Mutation}
```

### Step 3: Start the server and type the request query in GraphiQL

```javascript
mutation {
  addStudent_returns_object(collegeId:"col-101",firstName:"Susan",lastName:"George"){
    id
    firstName
    college{
      id
      name
    }
  }
}

```

The response will be as below , this query add a new student as well as retrieves that object along with college object. This saves round trips to the server

```javascript
  {
  "data": {
    "addStudent_returns_object": {
      "id": "rklUl08IX",
      "firstName": "Susan",
      "college": {
        "id": "col-101",
        "name": "AMU"
      }
    }
  }
}

```


<div style="page-break-after: always;"></div>


# Validation

 While adding or modifying data it is important to validate the user input.For example, we may need to ensure that the value of a field is always not null. We can use ! (non-nullable) type marker in GraphQL to perform such validation.

The syntax for using the ! type marker is as given below:

 ```javascript
  type TypeName {
      field1:String!,
      field2:String!,
      field3:Int!
  }

```

The above syntax ensures that all the fields are not null.

If we want to implement additional rules like checking for a string's length or checking if a number is within a given range, we can define custom validaters. The custom validation logic will be a part of the resolver function. Let us understand this with the help of an example.

## Illustration : Implementing Custom Validators

 Let us create a signup form with basic validation . The form will have email ,firsname and password fields.

### Step 1: Download and Install required dependencies for the project

- Create a folder named **validation-app** .Change the directory to **validation-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.
  
### Step 2: Create a schema  

 Add schema.graphql file in the project folder **validation-app** and add the following code

  ```javascript

type Query {
  greeting:String
}

type Mutation {

   signUp(input:SignUpInput):String
}

input SignUpInput {
    email:String!,
    password:String!,
    firstName:String!
}

```

Note to reduce the number of parameters in signUp function we can use the input type  SignUpInput.  So signUp function takes only one parameter of the type `SignUpInput`.  

### Step 3: Create Resolvers

Create a file **resolvers.js** in the project folder and add the following code-

```javascript
const Query = {
  greeting:()=>"Hello"
}
const Mutation ={
    signUp:(root,args,context,info)=>{

const {email,firstName,password} = args.input;

const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail= emailExpression.test(String(email).toLowerCase())
    if(!isValidEmail)
    throw new Error("email not in proper format")

    if(firstName.length>15)
      throw new Error("firstName should be less than 15 characters")

     if(password.length <8 )
      throw new Error("password should be minimum 8 characters")


        return "success";
    }

}

module.exports={Query,Mutation}
```

The resolver function `signUp` accepts parameters `email`,`password` and `firstName` . These will be passed through *input* variable so that it can be accessed through `args.input`

### Step 4: Run the application

- Create a server.js file.Refer step 8 in the Environment Setup Chapter.

- Execute the command npm start in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client   to test the application.

Open the browser and type the URL `http://localhost:9000/graphiql` Type the following query in the editor.

```javascript

 mutation doSignUp($input:SignUpInput) {
   signUp(input:$input)
}


```

Since input to signup function is a complex type , we need to use query variables in graphiql,for this we need to first give a name to query lets call it doSingUp, the `$input` is the query variable .

Following is the query variable, this must be entered in query variables tab of graphiql

```javascript
 {
   "input":{
     "email": "abc@abc",
    "firstName": "kannan",
    "password": "pass@1234"
  }
}

```

following is the response from server , errors array contains the details of the validation errors.

```javascript
{
  "data": {
    "signUp": null
  },
  "errors": [
    {
      "message": "email not in proper format",
      "locations": [
        {
          "line": 2,
          "column": 4
        }
      ],
      "path": [
        "signUp"
      ]
    }
  ]
}


```

Enter a proper input for each field ,for example-

```javascript
     {
   "input":{
     "email": "abc@abc.com",
    "firstName": "kannan",
    "password": "pass@1234"
  }
}

```

The response will be as below

```javascript
  {
  "data": {
    "signUp": "success"
  }
}

```

In the below query we are not providing the password.

```javascript
 {
   "input":{
     "email": "abc@abc.com",
    "firstName": "kannan"
  }
}

```

If a required field is not provided , then qraphql server will give following error.

```javascript

{
  "errors": [
    {
      "message": "Variable \"$input\" got invalid value {\"email\":\"abc@abc.com\",\"firstName\":\"kannan\"}; Field value.password of required type String! was not provided.",
      "locations": [
        {
          "line": 1,
          "column": 19
        }
      ]
    }
  ]
}

```

<div style="page-break-after: always;"></div>


# JQuery Integration

Web applications may want to send and retrieve data asynchronously (in the background).AJAX allows websites to load content onto the screen without refreshing the page.jQuery provides several methods for AJAX functionality thus making it easier to use AJAX . In this chapter we shall learn how we can integrate GraphQL with jQuery.  
  
Consider an application using client server architecture. We can build a front end webpage that requests data from a GraphQL server.The webpage will make ajax calls using jQuery to the GraphQL server.

To integrate GraphQL with JQuery,let us inspect the GraphiQL request headers and understand the request parameters.  

Start the hello-world app (refer chapter 6 for illustration).Type the  graphql query `{greeting}` in the GraphiQL window . Right click and inspect or (ctrl+shift+I) on chrome , go to the network tab as shown below

![1_request_header](https://user-images.githubusercontent.com/9062443/44342005-4f327280-a4a7-11e8-87ff-8afd3bf3547e.png)

From the simple hello world example we can understand that the http method used is **POST** .Now in the browser scroll down to the header section to view the *request payload* .  
Once you click on **view code** you will see following in request payload section of chrome .  

```javascript
  {"query":"{\n  greeting\n}","variables":null,"operationName":null}

```

Also note the request url `http://localhost:9000/graphql` that should be called from client application.

## Illustration

## Setting up the Server

### Step 1 : Download and Install required dependencies for the project

- Create a folder named **jquery-server-app** .Change your directory to **jquery-server-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.  

### Step 2: Create a schema

Add schema.graphql file in the project folder jquery-server-app and add the following code  

```javascript
type Query
{
    greeting: String
   sayHello(name:String!):String
}

```

The file has defined two queries `greeting` and `sayHello`. The `sayHello` query accepts a string parameter returns another string.The parameter to the `sayHello()` function is not null.

### Step 3 : Create Resolvers

Create a file resolvers.js in the project folder and add the following code

```javascript

const Query =
{
   greeting: () => 'Hello GraphQL  From TutorialsPoint !!' ,
   sayHello:(root,args,context,info)=> `Hi ${args.name} GraphQL server says Hello to you!!`

}

module.exports = {Query}

```

Here `greeting` and `sayHello` are two resolvers .In `sayHello` resolver the value passed to the name parameter can be accessed through `args`.To access resolver functions outside the module Query object has to be exported using module.exports

### Step 4: Run the application

- Create a server.js file.Refer step 8 in the Environment Setup Chapter.

- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client to test the application.Open browser and type the url `http://localhost:9000/graphiql` Type the following query in the editor.

```javascript
{
   greeting,
   sayHello(name:"Mohtashim")
}

```

The response from server is as given below-

```javascript
{
  "data": {
    "greeting": "Hello GraphQL  From TutorialsPoint !!",
    "sayHello": "Hi Mohtashim GraphQL server says Hello to you!!"
  }
}

```

## Setting up the Client

### Step 1: Create a new folder **jquery-client-app** outside the current project folder

### Step 2: Create an html page **index.html** for JQuery integration

We will create a client application in jquery and invoke both the methods. Following is the code for **index.html** file.
The **index.html** page sends requests to the server when the buttons Greet and SayHello are clicked. We will make asynchronous request using `$.ajax()` function.

```javascript
<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
$(document).ready(function(){

    $("#btnSayhello").click(function(){

       const name = $("#txtName").val();
       console.log(name);
       $("#SayhelloDiv").html('loading....');

       $.ajax({url: "http://localhost:9000/graphql",

        contentType: "application/json",type:'POST',
    data: JSON.stringify({ query:`{
                    sayHello(name:"${name}")
              }`
}),
        success: function(result){
            console.log(JSON.stringify(result))
            $("#SayhelloDiv").html("<h1>"+result.data.sayHello +"</h1>");
        }});


    });


    $("#btnGreet").click(function(){

         $("#greetingDiv").html('loading....');
         //https://kannan-first-graphql-app.herokuapp.com/graphql
        $.ajax({url: "http://localhost:9000/graphql",

        contentType: "application/json",
type:'POST',
        data: JSON.stringify({
query:`{greeting}`
}),
        success: function(result){
            $("#greetingDiv").html("<h1>"+result.data.greeting+"</h1>");
        }});
    });
});
</script>
</head>
<body>
        <h1>Jquery Client </h1>

<hr/>
        <section>
                    <button id="btnGreet">Greet</button>
                    <br/> <br/>
                    <div id="greetingDiv">
                  </div>


        </section>
        <br/> <br/> <br/>
        <hr/>

        <section>
             Enter a name:<input id="txtName" type="text" value="kannan"/>
                <button id="btnSayhello">SayHello</button>
                <div id="SayhelloDiv">
              </div>


    </section>


</body>
</html>

```

Open this file in the browser and click on the button to see the response. The output will be as given below
![2_jquery_output](https://user-images.githubusercontent.com/9062443/44388206-2791e780-a545-11e8-9df6-20fc55625ac7.png)


<div style="page-break-after: always;"></div>


# React Integration

React is a Javascript library for building user interfaces.This chapter explains how one can integrate GraphQL with a React application.  

The quickest way to set up a react project is by using  the *Create React App* tool. Follow the steps given below-

## Setting up the Server

### Step 1 : Download and Install required dependencies for the project

- Create a folder **react-server-app**.Change your directory to **react-server-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.  

### Step 2: Create a schema

Add schema.graphql file in the project folder **react-server-app** and add the following code  

```javascript

type Query
{
    greeting: String
   sayHello(name:String!):String
}

```

The file has defined two queries `greeting` and `sayHello`. The `sayHello` query accepts a string parameter returns another string.The parameter to the `sayHello()` function is not null.

### Step 3 : Create Resolvers

Create a file resolvers.js in the project folder and add the following code-

```javascript
const Query =
{
   greeting: () => 'Hello GraphQL  From TutorialsPoint !!' ,
   sayHello:(root,args,context,info)=> `Hi ${args.name} GraphQL server says Hello to you!!`

}

module.exports = {Query}

```

Here `greeting` and `sayHello` are two resolvers .In the`sayHello` resolver the value passed to the name parameter can be accessed through `args`.To access resolver functions outside the module Query object has to be exported using `module.exports`.  

### Step 4: Run the application  

- Create a server.js file.Refer step 8 in the Environment Setup Chapter.

- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a       client to test the application.
- Open browser and type the url `http://localhost:9000/graphiql` .Type the following query in the editor.  

```javascript
{
   greeting,
   sayHello(name:"Mohtashim")
}

```

The response from server is as given below-

```javascript

{
  "data": {
    "greeting": "Hello GraphQL  From TutorialsPoint !!",
    "sayHello": "Hi Mohtashim GraphQL server says Hello to you!!"
  }
}

```

## Setting up the Client

Open a new terminal for client . The server terminal should be kept running before executing the client application. React application will be running on port number 3000 and server application on port number 9000.

### Step 1: Create a react project hello-world-client

In the client terminal type the following command .  

`npx create-react-app hello-world-client`  

This will install everything needed for a typical react application. The **npx** utility and **create-react-app** tool creates a  project with name hello-world-client.Once the installation is completed open the project in VSCode.

### Step 2 :Start hello-world-client

Change the current folder path in the terminal to hello-world-client. Type `npm start` to launch the project.This will run a development server at port 3000 and will automatically open the browser and load the index page

This is shown in the screenshot given below:
![1_react_launch](https://user-images.githubusercontent.com/9062443/45262323-58718800-b432-11e8-89d9-daf6ed707f98.png)

### Step 3 : Modify the App Component

 In the App.js inside src folder add two functions - one to load greeting and and another to load sayHello messages.

Following is the `loadGreeting` function which sends  GraphQL query for greeting.

```javascript

async function loadGreeting(){
  const response=await fetch('http://localhost:9000/graphql', {
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({query:'{greeting}'})

  })

  const rsponseBody= await response.json();
  return rsponseBody.data.greeting;

  console.log("end of function")

}


```

Following is the `loadSayhello` function which sends  GraphQL query for `sayHello`.

```javascript

async function  loadSayhello(name){
  const response=await fetch('http://localhost:9000/graphql', {
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({query:`{sayHello(name:"${name}")}`})

  })



```

The complete App.js file is shown below

```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

async function loadGreeting(){
  const response=await fetch('http://localhost:9000/graphql', {
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({query:'{greeting}'})

  })

  const rsponseBody= await response.json();
  return rsponseBody.data.greeting;

  console.log("end of function")

}

 async function  loadSayhello(name){
  const response=await fetch('http://localhost:9000/graphql', {
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({query:`{sayHello(name:"${name}")}`})

  })

  const rsponseBody= await response.json();
  return rsponseBody.data.sayHello;

 }

class App extends Component {

  constructor(props){
    super(props);
    this.state = {greetingMessage:'',sayHelloMessage:'',userName:''}

    this.updateName = this.updateName.bind(this);
    this.showSayHelloMessage = this.showSayHelloMessage.bind(this);
    this.showGreeting = this.showGreeting.bind(this);
  

  }

  showGreeting(){
    loadGreeting().then(g=>this.setState({greetingMessage:g+" :-)"}))

  }
  showSayHelloMessage(){
    const name =this.state.userName;
    console.log(name)
    loadSayhello(name).then(m=>this.setState({sayHelloMessage:m}))
  }

  updateName(event){
    this.setState({userName:event.target.value})

  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br/><br/>
        <section>
                    <button id="btnGreet" onClick={this.showGreeting}>Greet</button>
                    <br/> <br/>
                    <div id="greetingDiv">
                    <h1>
                   {this.state.greetingMessage}
                   </h1>
                  </div>

        </section>


         <hr/>

         <section>
             Enter a name:<input id="txtName" type="text" onChange={this.updateName}
             value={this.state.userName}/>
                <button id="btnSayhello" onClick={this.showSayHelloMessage}>SayHello</button>
              <br/>
              user name is:{this.state.userName}    <br/>
              <div id="SayhelloDiv">
               <h1> {this.state.sayHelloMessage}  </h1>
              </div>

    </section>


      </div>
    );
  }
}

export default App;

```

Once both applications are running click on the greet button.After that enter a name in the textbox and click on sayHello button.  Output will be as given below.

![react-ouput](https://user-images.githubusercontent.com/9062443/44403682-b6692900-a572-11e8-883b-1c8d50eada16.png)


<div style="page-break-after: always;"></div>


# Apollo Client

We have used Apollo Server to build graphql specification on server side.It is quick and easy to build production ready GraphQL server.Now let us look at the client side.

Apollo Client is the best way to use GraphQL to build client applications. The client is designed to help developer quickly build a UI that fetches data with GraphQL, and can be used with any JavaScript front-end.

Apollo Client supports following platforms.

|Sr No |  Platform |  Framework
|:----:|:----------|:------------------
|  1 | Javascript  | React,Angular,Vue,Meteor,Ember
|  2 | WebComponents  | Polymer , lit-apollo
|  3 | Native Mobile  | Native Android with Java, Native iOS with Swift

One of the major feature of apollo client is caching. `apollo-boost` is a convenience package which brings in a bunch of other dependencies.  

## Setting Up Server

### Step 1 : Download and Install required dependencies for the project

- Create a folder **apollo-server-app**.Change your directory to **apollo-server-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.  

### Step 2: Create a schema

Add schema.graphql file in the project folder **apollo-server-app** and add the following code  

```javascript

type Query
{
        students:[Student]
 }

type Student {
    id:ID!
    firstName:String
    lastName:String
    college:College
}

type College {
    id:ID!
    name:String
    location:String
    rating:Float
}
```

### Step 3: Add Resolvers  

Create a file resolvers.js in the project folder and add the following code  

```javascript

const db = require('./db')

const Query = {
     //resolver function for students returns list
   students:()=>db.students.list(),
}
const Student={
      college:(root)=>{
      return db.colleges.get(root.collegeId);
   }
}

module.exports = {Query,Student}

```

### Step 4: Run the application  

- Create a server.js file.Refer step 8 in the Environment Setup Chapter.
- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a  client to test the application.Open browser and type the url `http://localhost:9000/graphiql` Type the following query in the editor.  

```javascript

 {
        students{
          id
          firstName
          college{
            name
          }
        }
    }
```  

The response for the query will be as given below  

```javascript
{
  "data": {
    "students": [
      {
        "id": "S1001",
        "firstName": "Mohtashim",
        "college": {
          "name": "CUSAT"
        }
      },
      {
        "id": "S1002",
        "firstName": "Kannan",
        "college": {
          "name": "AMU"
        }
      },
      {
        "id": "S1003",
        "firstName": "Kiran",
        "college": {
          "name": "AMU"
        }
      }
    ]
  }
}

```

## Setting up the Client  

Open a new terminal for client . The server terminal should be kept running before executing the client application. React application will be running on port number 3000 and server application on port number 9000.

### Step 1: Create a react application

In the client terminal type the following command  

`npx create-react-app hello-world-client`  

This will install everything needed for a typical react application. The npx utility and create-react-app tool creates a project with name hello-world-client.Once the installation is completed open the project in VSCode.

### Step 2 :Start hello-world-client  

Change the current folder path in the terminal to hello-world-client. Type `npm start` to launch the project.This will run a development server at port 3000 and will automatically open the browser and load the index page  
This is shown in the screenshot given below:

![1_react_launch](https://user-images.githubusercontent.com/9062443/45262323-58718800-b432-11e8-89d9-daf6ed707f98.png)

### Step 3 :Install apollo client libraries  

To install an apollo client open a new terminal and be in current project folder path .Type following command.

```javascript
    npm install apollo-boost graphql
```

This will download the graphql libraries for client side and also the apollo boost package.We can cross verify this by typing `npm view apollo-boost dependencies`.This will have many dependencies as shown below-

```javascript
  { 'apollo-cache': '^1.1.15',
  'apollo-cache-inmemory': '^1.2.8',
  'apollo-client': '^2.4.0',
  'apollo-link': '^1.0.6',
  'apollo-link-error': '^1.0.3',
  'apollo-link-http': '^1.3.1',
  'apollo-link-state': '^0.4.0',
  'graphql-tag': '^2.4.2' }

```

We can clearly see that apollo-client library installed.

### Step 4 : Modify the App Component in index.js file

With apollo client we can directly call server without the use of `fetch` api. Also the queries and mutations should not be embedded in a string made with back tick notation.This is because, the `gql` function directly parses the queries. This means, a programmer can directly write queries in the the same way when writing queries in GraphiQL tool.
`gql` is a tag function which will parse the template string written in back tick notation to graphql query object. The apollo client query method returns a promise.

Following shows how to import ApolloClient

```javascript

import {ApolloClient ,HttpLink , InMemoryCache} from 'apollo-boost'


const endPointUrl = 'http://localhost:9000/graphql'
const client  = new ApolloClient({
 link: new HttpLink({uri:endPointUrl}),
 cache:new InMemoryCache()
});

```

Following code shows how to use gql function . The `loadStudentsAsync` function using graphql client to query the server.In the previuos  chapter we discussed how to use `fetch` api for HTTP requests.

```javascript

async function loadStudentsAsync() {
    const query=gql`
    {
        students{
          id
          firstName
          lastName
          college{
            name
          }
        }
    }
    `
   const {data} = await client.query({query}) ;
   return data.students;
}


```

For simplicity you only need to keep the index.js in src folder and index.html in public folder all other files auto generated can be removed . Directory structure is given below.

```javascript
hello-world-client /

      -->node_modules
      -->public
           index.html
       -->src
           index.js
      -->package.json

```

Following is the **index.js** in react application.

```javascript

import React , {Component} from 'react';
import ReactDOM from 'react-dom';

// apollo client

import {ApolloClient ,HttpLink , InMemoryCache} from 'apollo-boost'
import gql from 'graphql-tag'

const endPointUrl = 'http://localhost:9000/graphql'
const client  = new ApolloClient({
 link: new HttpLink({uri:endPointUrl}),
 cache:new InMemoryCache()
});


async function loadStudentsAsync() {
    const query=gql`
    {
        students{
          id
          firstName
          lastName
          college{
            name
          }
        }
    }
    `
   const {data} = await client.query({query}) ;
   return data.students;
}

class  App  extends Component {
    constructor(props) {
        super(props);
        this.state ={
            students:[]
        }
        this.studentTemplate= [];
    }

   async loadStudents(){

        const studentData =  await loadStudentsAsync();

        this.setState({
            students: studentData
        })
         console.log("loadStudents")
    }
    render()
    {
        return(
            <div>
               <input type="button"  value="loadStudents" onClick={this.loadStudents.bind(this)}/>
                <div>
                    <br/>
                    <hr/>
                    <table border="3">
                    <thead>
                       <tr>
                           <td>First Name</td>
                           <td>Last Name</td>
                           <td>college Name</td>
                      </tr>
                    </thead>
                    <tbody>
                       { this.state.students.map(s=>{
                          return (
                               <tr key={s.id}>
                               <td>
                               {s.firstName}
                               </td>
                               <td>
                               {s.lastName}
                               </td>
                               <td>
                               {s.college.name}
                               </td>
                               </tr>
                          )
                      })}
                     </tbody>
                      </table>
                    </div>
            </div>
        )
    }

}

ReactDOM.render(<App/>, document.getElementById('root'));


```

The react application will load students from GraphQL server once we click on loadStudents button as shown below

![1_loadstudents](https://user-images.githubusercontent.com/9062443/44627918-45e85080-a954-11e8-89b0-1217dfbb1861.png)


<div style="page-break-after: always;"></div>


# Authentication

Authentication is the process or action of verifying the identity of a user or process. It is important that an application authenticates a user to ensure that the data is not available to an anonymous user.In this section we will learn how to authenticate a GraphQL client.
  
## Express JWT

In this example, we will use jQuery to create a client application. In order to authenticate requests, we will use `express-jwt` module on the server-side.  
The `express-jwt` module is a middleware that lets you authenticate HTTP requests using JWT tokens.JSON Web Token (JWT) is a long string that identifies the logged in user.Once the user logs in successfully , the server generates a JWT token. This token distinctly identifies a logged. In other words, the token is a representation of the user's identity.So next time the client comes to the server it has to present this token, to get the needed resources. The client can be a mobile application or a web application.

![authentication](https://user-images.githubusercontent.com/9062443/45263854-5d910000-b44f-11e8-834a-942389a0b2a9.jpg)

## Illustration

## Setting up the Server

### Step 1 : Download and Install required dependencies for the project

- Create a folder **auth-server-app**.Change your directory to **auth-server-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.

### Step 2: Create a schema

Add schema.graphql file in the project folder **auth-server-app** and add the following code  

```javascript

type Query
{
       greetingWithAuth:String
}

```

### Step 3: Add Resolvers  

Create a file resolvers.js in the project folder and add the following code . The resolver will verify if an authenticated user object is available in the context object of GraphQL. It will raise an exception if an authenticated  user is not available.

```javascript

const db = require('./db')

const Query = {
    greetingWithAuth:(root,args,context,info)=>{

//check if the context.user is null
        if (!context.user) {
            throw new Error('Unauthorized');
          }
        return "Hello from TutorialsPoint, welcome back : "+context.user.firstName;
    }
}

module.exports = {Query}

```

### Step 4: Create Server.js file

The authentication middleware authenticates callers using a JSON Web Token.The url for authentication will be `http://localhost:9000/login`.This will be a post operation and user will have to submit his email and password . It will be validated from the backend, if valid a token is generated using `jwt.sign` method, so for subsequent requests client will have to send this in header.If the token is valid, `req.user` will be set with the JSON object decoded to be used by later middleware for authorization and access control.

The following code uses two modules `jsonwebtoken` and `express-jwt` to authenticate requests .

- When the user clicks on the **greet** button,a request for the /graphql route is issued. If the user is not authenticated, he will be  prompted to authenticate himself.
- The user is presented with a form that accepts email id and password.In our example, the /login route is responsible for authenticating the user.
- The /login route verifies if a match is found in the database for credentials provided by the user.
- If the credentials are invalid,an HTTP 401 exception is returned to the user.
- If the credentials are valid,a token is generated by the server. This token is sent as a part of the response to the user. This is done by the `jwt.sign` function.

```javascript
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
//private key
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
  
app.post('/login', (req, res) => {
  const {email, password} = req.body;
  //check database
  const user = db.students.list().find((user) =>  user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  //generate a token based on private key , token doesn't have an expiry
  const token = jwt.sign({sub: user.id}, jwtSecret);
  res.send({token});
});



```

- For every request,the `app.use()` function will be called.This in turn will invoke the expressJWT middleware. This middleware will decode the JSON Web Token. User id stored in the token will be retrieved and stored as a property `user` in the request object.

```javascript
//decodes the JWT and stores in request object
app.use(expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}));


```

- To make available,the user property within GraphQL context,this property is assigned to the **context** object as shown below.

```javascript
//Make req.user available to GraphQL context
app.use('/graphql', graphqlExpress((req) => ({
  schema,
  context: {user: req.user && db.students.get(req.user.sub)}
})));


```

Create **server.js** in current folder path . The complete server.js file is as follows

```javascript
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt'); //auth
const jwt = require('jsonwebtoken'); //auth
const db = require('./db');

var port = process.env.PORT || 9000
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
const app = express();


const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
const resolvers = require('./resolvers')
const {makeExecutableSchema}=require('graphql-tools')



const schema = makeExecutableSchema({typeDefs , resolvers})


app.use(cors(), bodyParser.json(), expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}));


const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express')

app.use('/graphql', graphqlExpress((req) => ({
  schema,
  context: {user: req.user && db.students.get(req.user.sub)}
})));
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))


//authenticate students
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  const user = db.students.list().find((user) =>  user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({sub: user.id}, jwtSecret);
  res.send({token});
});

app.listen(port, () => console.info(`Server started on port ${port}`));

```

### Step 5: Run the application  

- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a  client to test the application.Open browser and type the url `http://localhost:9000/graphiql` Type the following query in the editor.  

```javascript
{
  greetingWithAuth
}

```

The response is as shown below , since we have not authenticated we will get error.

```javascript
{
  "data": {
    "greetingWithAuth": null
  },
  "errors": [
    {
      "message": "Unauthorized",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "greetingWithAuth"
      ]
    }
  ]
}
```

 Lets create a client application to authenticate

## Setting up the Jquery client

- In the client application a greet button is provided which will invoke the schema `greetingWithAuth` , if you click the button without login , it will give you the error message as below .

![jQuery clientUI](https://user-images.githubusercontent.com/9062443/44637227-a5367700-a9cd-11e8-91eb-79ff28e0673d.png)  

- Once you login with a user available in database the following screen will appear  

![3_jquery_app](https://user-images.githubusercontent.com/9062443/44637611-d3b55180-a9cf-11e8-964c-518015d0c117.png)  

So for accessing greeting we need to first access `http://localhost:9000/login` route as below , the response will contain the token generated from server.  

```javascript

 $.ajax({
            url:"http://localhost:9000/login",
            contentType:"application/json",
            type:"POST",
            data:JSON.stringify({email,password}),
            success:function(response){
                loginToken = response.token;
                $('#authStatus')
                .html("authenticated successfully")
                .css({"color":"green",'font-weight':'bold'});
              $("#greetingDiv").html('').css({'color':''});
            },
            error:(xhr,err)=> alert('error')
        })


```

- After login successfully we can access `greetingWithAuth` schema as given  below , there should be a `Authorization` header for all subsequent request with `bearer` token.

```javascript

  {  url: "http://localhost:9000/graphql",
        contentType: "application/json",
        headers: {"Authorization": 'bearer '+loginToken},  type:'POST',
        data: JSON.stringify({
         query:`{greetingWithAuth}`
  }

```

Following is index.html

```javascript

 <!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
$(document).ready(function(){
    let loginToken="";

   $("#btnGreet").click(function(){

        $.ajax({url: "http://localhost:9000/graphql",
        contentType: "application/json",
        headers: {"Authorization": 'bearer '+loginToken},
       type:'POST',
        data: JSON.stringify({
      query:`{greetingWithAuth}` }),
        success: function(result){
            $("#greetingDiv").html("<h1>"+result.data.greetingWithAuth+"</h1>")
        },
        error:function(jQxhr,error){
          if(jQxhr.status==401){
              $("#greetingDiv").html('please authenticate first!!')
              .css({"color":"red",'font-weight':'bold'})
              return;
          }

          $("#greetingDiv").html('error').css("color","red");


        }
    });
    });
    $('#btnAuthenticate').click(function(){
        var email = $("#txtEmail").val();
        var password = $("#txtPwd").val();

        if(email && password) {

        $.ajax({
            url:"http://localhost:9000/login",
            contentType:"application/json",
            type:"POST",
            data:JSON.stringify({email,password}),
            success:function(response){
                loginToken = response.token;
                $('#authStatus')
                .html("authenticated successfully")
                .css({"color":"green",'font-weight':'bold'});
              $("#greetingDiv").html('').css({'color':''});
            },
            error:(xhr,err)=> alert('error')
        })
    }else alert("email and pwd empty")


    })

});
</script>
</head>
<body>
        <h1> GraphQL Authentication </h1>

<hr/>
        <section>
                    <button id="btnGreet">Greet</button>
                    <br/> <br/>
                    <div id="greetingDiv">
                  </div>

        </section>
        <br/> <br/> <br/>
        <hr/>

        <section id="LoginSection">
            <header>
                <h2>*Login first to  access greeting </h2>
            </header>
            <input type="text" value="mohtashim@tutorial.com" placeholder="enter email" id="txtEmail"/>
            <br/>
           <input type="password" value="pass@123" placeholder="enter password" id="txtPwd"/>

            <br/>

            <input type="button" id="btnAuthenticate"  value="Login"/>
            <p id="authStatus"></p>

      </section>
</body>
</html>
```


<div style="page-break-after: always;"></div>

# Caching

Caching is the process of storing data in a temporary storage area called *cache*. When you return to a page you've recently visited, the browser can get those files from the cache rather than the original server. This saves your time and the network from the burden of additional traffic.  

Client applications interacting with GraphQL are responsible for caching data at their end.One possible pattern for this is reserving a field, like `id`, to be a globally unique identifier.  

## InMemory Cache

 InMemoryCache is a normalized data store commonly used in GraphQL client applications without use of other library like Redux.

  The sample code to use InMemoryCache with ApolloClient is given below.

 ```javascript

  import {ApolloClient ,HttpLink , InMemoryCache} from 'apollo-boost'
  const cache = new InMemoryCache();

  const client = new ApolloClient({
      link: new HttpLink(),
      cache
    });

 ```

 The InMemoryCache constructor takes an optional config object with properties to customize your cache

|Sr No |  parameter              |Description
|:----:|:--------------------------|:----------
| 1    | addTypename   | A boolean to determine whether to add __typename to the document (default: true)
| 2    | dataIdFromObject     | A function that takes a data object and returns a unique identifier to be used when normalizing the data in the store
| 3  | fragmentMatcher  | By default, the InMemoryCache uses a heuristic fragment matcher
| 4 | cacheRedirects | A map of functions to redirect a query to another entry in the cache before a request takes place.

## Illustration

We will create a single page application in ReactJS with two tabs one for the home tab and another for students.The students tab will load data from a GraphQL server API. The application will query for students data when the user navigates from the home tab to the students tab. The resulting data will be cached by the application.  

 We will also query the server time using `getTime` field to verify if the page is cached.If data is returned from the cache,the page will display the time of the very first request sent to the server. If the data is a result of a fresh request made to the sever, it will always show the latest time from server.

## Setting up the server

## Step 1 : Download and Install required dependencies for the project

- Create a folder **cache-server-app**.Change your directory to **cache-server-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.

## Step 2: Create a schema

Add schema.graphql file in the project folder cache-server-app and add the following code

```javascript
 type Query {
  
    students:[Student]
    getTime:String
}

type Student {
    id:ID!
    firstName:String
    lastName:String
    fullName:String
    }


 ```

## Step 3: Add Resolvers

Create a file resolvers.js in the project folder and add the following code-

 ```javascript

const db = require('./db')

const Query = {
    students:()=>db.students.list(),
     getTime:()=>{
        const today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        return `${h}:${m}:${s}`;
    }
}

module.exports = {Query}
 ```

## Step 4: Run the application

- Create a server.js file.Refer step 8 in the Environment Setup Chapter

- Execute the command npm start in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client   to test the application.
 Open browser and type the url `http://localhost:9000/graphiql` Type the following query in the editor.

```javascript

  {
    getTime
            students {
                id
              firstName
          }
  }
 ```

sample response shows the students and the server time.

```javascript
{
  "data": {
    "getTime": "22:18:42",
    "students": [
      {
        "id": "S1001",
        "firstName": "Mohtashim"
      },
      {
        "id": "S1002",
        "firstName": "Kannan"
      },
      {
        "id": "S1003",
        "firstName": "Kiran"
      }
    ]
  }
}
```

## Setting up the ReactJS Client  

Open a new terminal for client . The server terminal should be kept running before executing the client application. React application will be running on port number 3000 and server application on port number 9000.  

### Step 1: Create a react application

In the client terminal type the following command

`npx create-react-app hello-world-client`

- This will install everything needed for a typical react application. The npx utility and create-react-app tool creates a project with name hello-world-client.Once the installation is completed open the project in VSCode.  

- Install router modules for react using following command
 `npm install react-router-dom`

### Step 2 :Start hello-world-client  

Change the current folder path in the terminal to hello-world-client. Type `npm start` to launch the project.This will run a development server at port 3000 and will automatically open the browser and load the index page
This is shown in the screenshot given below:  

![client](https://user-images.githubusercontent.com/9062443/45262323-58718800-b432-11e8-89d9-daf6ed707f98.png)  

### Step 3 :Install apollo client libraries

To install an apollo client open a new terminal and be in current project folder path .Type following command.  

```javascript
npm install apollo-boost graphql

```

This will download the graphql libraries for client side and also the apollo boost package.We can cross verify this by typing `npm view apollo-boost dependencies`.This will have many dependencies as shown below-  

```javascript
{ 'apollo-cache': '^1.1.15',
  'apollo-cache-inmemory': '^1.2.8',
  'apollo-client': '^2.4.0',
  'apollo-link': '^1.0.6',
  'apollo-link-error': '^1.0.3',
  'apollo-link-http': '^1.3.1',
  'apollo-link-state': '^0.4.0',
  'graphql-tag': '^2.4.2' }
```

We can clearly see that apollo-client library installed.

### Step 4 : Modify the App Component in index.js file

For simplicity of react application you only need to keep the index.js in src folder and index.html in public folder all other files auto generated can be removed . Directory structure is given below.

```javascript
hello-world-client /

      -->node_modules
      -->public
           index.html
       -->src
           index.js
           students.js
      -->package.json

```

Add additional file students.js which will contain Students Component . Student details are fetched through the Student Component. In the App Component we are using a HashRouter.

Following is the **index.js** in react application.

```javascript
import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route , Link} from 'react-router-dom'
//components
import Students from './students'

class App extends Component {
    render(){
        return(
            <div><h1>Home !!</h1>
             <h2>Welcome to React Application !! </h2>
            </div>
        )
    }
}

function getTime(){
    var d =new Date();
    return d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
}

const routes = <HashRouter>
             <div>
                <h4>Time from react app:{getTime()}</h4>
                 <header>
                <h1>  <Link to="/">Home</Link>&ensp;
                  <Link to="/students">Students</Link>&ensp; </h1>
                </header>
                    <Route exact path="/students" component={Students}></Route>
                    <Route exact path="/" component={App}></Route>
              </div>

              </HashRouter>

ReactDOM.render(routes, document.querySelector("#root"))

```

### Step 5: Edit Component Students in Students.js

 In Students Component we will use two approaches to load data .
  1. Fetch API (loadStudents_noCache) - This will trigger a new request everytime the clicks the student tab.
  2. Apollo Client (loadWithApolloclient)- This will fetch data from the cache.

  Add a function `loadWithApolloclient` which query for students and  time from server .This function will enable caching.Here we use a gql function to parse the query .

  ```javascript
    async loadWithApolloclient(){
         const query =gql`{
            getTime
            students {
                id
              firstName
            }
          }`;

        const {data} = await  client.query({query})
        return data;

    }

  ````

 The Fetch API is a simple interface for fetching resources. Fetch makes it easier to make web requests and handle responses than with the older XMLHttpRequest.
  Following method shows loading data directly using fetch api.

 ```graphql

  async  loadStudents_noCache(){
        const response=await fetch('http://localhost:9000/graphql', {
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify({query:`{
            getTime
            students {
                id
              firstName
            }
          }`})
        })

        const rsponseBody= await response.json();
        return rsponseBody.data;
    }


 ```

In the constructor of StudentsComponent call the loadWithApolloClient method.
The complete **Student.js** file is below

```graphql


import React ,{Component} from 'react';
import { Link} from 'react-router-dom'

  
//Apollo Client
import {ApolloClient , HttpLink , InMemoryCache} from 'apollo-boost'
import gql from 'graphql-tag'
const client = new ApolloClient({
    link: new HttpLink({uri:`http://localhost:9000/graphql`}),
    cache:new InMemoryCache()

})


class Students extends Component {

    constructor(props){
        super(props);
        this.state={
            students:[{id:00,firstName:'test'}],
            serverTime:''
        }
        this.loadWithApolloclient().then(data=>{
            this.setState({
                students:data.students,
                serverTime:data.getTime
            })
        })
    }

     async  loadStudents_noCache(){
        const response=await fetch('http://localhost:9000/graphql', {
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify({query:`{
            getTime
            students {
                id
              firstName
            }
          }`})
        })

        const rsponseBody= await response.json();
        return rsponseBody.data;
    }

    async loadWithApolloclient(){
        console.log("inside apollo client function")
         const query =gql`{
            getTime
            students {
                id
              firstName
            }
          }`;

        const {data} = await  client.query({query})
        return data;

    }

      render(){

        return(
            <div>
              <h3>Time from GraphQL server :{this.state.serverTime}</h3>
               <p>Following Students Found </p>
               <div>
                   <ul>
               {
                 this.state.students.map(s=>{
                    return(
                    <li key={s.id}>
                   {s.firstName}
                     </li>
                    )
                 })
               }
               </ul>
               </div>

            </div>
        )
    }
}


export default Students


````

### Step 6: Run the react application with npm start

 You can test the react application from  by switching from home tab to students tab. Once the students tab is loaded with data from server.It will cache the data.You can test it by switching from home and students multiple times. The output will be as shown below.

 ![2_caching_stduents](https://user-images.githubusercontent.com/9062443/45249007-5aeeb780-b336-11e8-8f1d-37586b7b2266.png)

 If you have loaded the students page first by typing url `http://localhost:3000/#/students` you can see the react app loaded time and GraphQL load time would be approximately same . After that
 if you switch to home view and return back the GraphQL server time will not change. This shows the data is cached.

### Step 7: Change loadWithApolloclient call to loadStudents_noCache

 If you change the load method to loadStudents_noCache in constructor of StudentComponent,
 the output will not cache the data. This way you can see the difference between caching and non caching.

```javascript

this.loadStudents_noCache().then(data=>{
            this.setState({
                students:data.students,
                serverTime:data.getTime
            })
        })


```

![1_no_caching_student](https://user-images.githubusercontent.com/9062443/45249057-24656c80-b337-11e8-986b-2e4e15e1c6c0.png)

From the above output you can see if you switch back and forth between tabs the time from graphql server will always be latest . That means it is not caching data.


<div style="page-break-after: always;"></div>


# GraphQL Tutorial

GraphQL is an open source server side technology . GraphQL was developed by facebook to optimise RESTful API calls. It is a data query language as well as an execution engine.

This tutorial will introduce you to the fundamental concepts of  GraphQL. In this tutorial we will :

- Implement GraphQL API using Apollo server  
- Test GraphQL API using GraphiQL  
- Build ReactJS(with Apollo Client library) and jQuery client applications to consume the API

# Audience

This tutorial is created for developers who have worked on JavaScript applications based on Client-Server architecture. After completing this tutorial, you will be able to build moderately complex GraphQL APIs for mobile and web applications.

# Prerequisites

 This course is based on NodeJs and Express . So if you have a basic understanding of NodeJS  then it will be easy to learn GraphQL. For frontend integration of GraphQL we will be using ReactJs and Jquery .Illustrations in this tutorial uses EcmaScript 6(ES6) syntax . So  any knowledge in these areas can be helpful.

<div style="page-break-after: always;"></div>


# Why GraphQL

RESTful APIs follow a resource-oriented approach that is clear and well structured. But when the data gets more and more complex, the routes get longer and longer, and sometimes it isn’t even possible to fetch the data you want with a single request. This is where GraphQL comes into play.
GraphQL structures data in the form of a graph.It has a powerful query syntax for traversing, retrieving, and modifying data.

## 1. Ask for what you need,get exactly that

Send a GraphQL query to your API and get exactly what you need, nothing more and nothing less. GraphQL queries always return predictable results. Applications using GraphQL are fast and stable.Unlike Restful services, these applications can restrict data that should be fetched from the server. The following example will help you understand this better.

Let us consider a business object Student with the attributes id , firstName ,lastName and collegeName .Suppose a mobile application needs to fetch only the firstName and id.If we design a REST endpoint like `/api/v1/students`, it will end up fetching data for all the fields for a student object. This means, data is overfetched by the RESTful service.

This problem can be solved by using GraphQL. Consider the following sample GraphQL query given below.

```javascript
{
  students{
    id
    firstName
  }
  
}

```

The above query will return values only for the id and firstname fields in the response.The query will not fetch values for other attributes of the student object. The response of the query illustrated above will be as shown below:

```javascript
{
  "data": {
    "students": [
      {
        "id": "S1001",
        "firstName": "Mohtashim"
      },
      {
        "id": "S1002",
        "firstName": "Kannan"
      }
    ]
  }
}

```

## 2. Get many resources in a single request

GraphQL queries  helps to smoothly retrieve associated business objects ,while typical REST APIs require loading from multiple URLs. GraphQL APIs fetch all the data your application needs in a single request. Applications using GraphQL can be quick even on slow mobile network connections.  

Let us consider one more business object College which has the attributes name and location. The Student business object has an association relationship with the College object. If we were to use a REST API in order to fetch the details of students and their college we will end up making two requests to server like `/api/v1/students` and `/api/v1/colleges` .This will lead to under fetching of data , that is less data fetched in each request .So mobile applications are forced to make multiple calls to server to get the desired data .

However, the mobile application can fetch details for both -Student and College objects in a single request by using GraphQL. The GraphQL query for the same will be

```javascript
    {
    students{
        id
        firstName
        lastName
        college{
        name
        location
        }
    }
    }
```

The response will contain exactly the fields in the query .

```javascript
{
  "data": {
    "students": [
      {
        "id": "S1001",
        "firstName": "Mohtashim",
        "lastName": "Mohammad",
        "college": {
          "name": "CUSAT",
          "location": "Kerala"
        }
      },
      {
        "id": "S1002",
        "firstName": "Kannan",
        "lastName": "Sudhakaran",
        "college": {
          "name": "AMU",
          "location": "Uttar Pradesh"
        }
      },
      {
        "id": "S1003",
        "firstName": "Kiran",
        "lastName": "Panigrahi",
        "college": {
          "name": "AMU",
          "location": "Uttar Pradesh"
        }
      }
    ]
  }
  }

```

## 3. Describe what’s possible with a type system

GraphQL queries are based on fields and their associated data types.GraphQL is strongly typed.If there is type mismatch in a GraphQL query, server applications return clear and helpful error messages. This helps in smooth debugging and easy detection of bugs by client applications.GraphQL also provides client side libraries that can help in reducing explicit data conversion and parsing.

 An example of the the Student and College data types is as given below.

```graphql

type Query {
    students:[Student]
}

    type Student {
    id:ID!
    firstName:String
    lastName:String
    fullName:String
    college:College
   }

   type College {
    id:ID!
    name:String
    location:String
    rating:Float
    students:[Student]
 }


  ```

## 4. Move faster with powerful developer tools

GraphQL provides rich developer tools for documentation and testing queries. **GraphiQL** is an excellent tool which generates documentation of the query and its schema. It also gives a query editor to test GraphQL APIs. It also provides intelligent code completion capability while building queries.

<div style="page-break-after: always;"></div>


# Environment Setup

To execute the examples in this tutorial you will need-

- A computer running Linux, macOS, or Windows.
- A web browser, preferably the latest version of Google Chrome.
- A recent version of Node.js installed. The latest LTS version is recommended
- Visual Studio Code with extension *GraphQL for VSCode* installed or any code editor of your choice

## How to Build a GraphQL server with nodejs

### Step 1 : Verify Node and NPM versions
  
  After Installing nodejs , verify the version of node and npm using following commands on the terminal

```javascript
C:\Users\Admin>node -v
v8.11.3

C:\Users\Admin>npm -v
5.6.0

```

### Step 2: Create a project folder and open in VSCode

The root folder of project can be named **test-app** and open the folder using visual studio code editor by following the instructions.

```javascript

C:\Users\Admin>mkdir test-app
C:\Users\Admin>cd test-app
C:\Users\Admin\test-app>code .

```

### Step 3: Create  **package.json** and install the dependencies

- Create a package.json file which will contain all the dependencies of the GraphQL server application.

```javascript
{
  "name": "test-app",
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
    "node-datetime": "^2.1.0",
    "notarealdb": "0.2.2",
    "express-jwt": "5.3.1",
    "jsonwebtoken": "8.2.0"
  },
  "devDependencies": {
    "nodemon": "1.17.1"
  }
}

```

- Install the dependencies by using the command as given

```javascript
C:\Users\Admin\test-app>npm install
```

### Step 4 : Create flat file database in data folder

This tutorial will be using flat files to store and retrieve data.Create a folder **data** and add two files **students.json** and **colleges.json** . Following will be the contents of the files.

- following is colleges.json

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

- following is students.json

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

## Step 5: Create a data access layer

We need a datastore which will load the **data** folder contents. The datastore should contain students and colleges collection variables. So any time application need to get data they can use these collection variables.

- Create file **db.js** with in the project folder ,this will be our datastore

```javascript

const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
  students:store.collection('students'),
  colleges:store.collection('colleges')
};

```

## Step 6: Create schema file schema.graphql

Create a schema file in the current project folder  and add following contents.

```javascript
  type Query  {
    test: String
}  

```

## Step 7: Create resolver file resolvers.js

Create a resolver file in the current project folder  and add following contents.

```javascript

const Query = {
  
       test: () =>  'Test Success , GraphQL server is up & running !!'
}

module.exports = {Query}

```

## Step 8: Create **Server.js** and Configure GraphQL

```javascript

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const db = require('./db');

const port = process.env.PORT || 9000;
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

### Step 9 : Run the application and test with GraphiQL

- verify the folder structure of project test-app

```javascript

test-app /

      -->package.json
      -->db.js
      -->data
             students.json
             colleges.json
      -->resolvers.js
      -->schema.graphql
      -->server.js

```

- run the command `npm start`.

```javascript
    C:\Users\Admin\test-app>npm start  
```

- The server is running in 9000 port so we can test the application using GraphiQL tool . Open browser and type the url `http://localhost:9000/graphiql` . Type the following query in the editor.

```javascript
  {
  test
  }

```

The response from the server is will be as below.

```javascript
  {
  "data": {
    "test": "Test Success , GraphQL server is running !!"
  }
}


```

![1_test_setup](https://user-images.githubusercontent.com/9062443/44847540-704a4e80-ac71-11e8-9bc2-d76fa69d822f.png)

<div style="page-break-after: always;"></div>


# Architecture

  GraphQL is a specification. It describes the behaviour of a GraphQL server. It is a set of guidelines that defines how requests and responses should be handled ,like  the supported protocols,format of the data that can be accepted by the server, the format of response returned by the server etc.Request made by a client to the GraphQL server is called a **Query**.
 Another important concept of GraphQL is its transport layer agnostics . It can be used with any available network protocol like TCP , websocket or any other transport layer protocol . It is also neutral to databases,so you can use it with relational or  NoSQL databases.

GraphQL Server can be deployed by using any of the three methods listed below:

1. GraphQL Server with connected database.
2. GraphQL server that integrates existing systems.
3. Hybrid approach .

## 1. GraphQL server with Connected Database

This Architecture is often used with new projects.This architecture has a GraphQL Server with an integrated database.
On the receipt of  a Query,the server reads the request payload and fetches data from the database. This is called **resolving the query**. The response returned to the client adheres to the format specified in the official GraphQL specification.

![1_dbserver_02](https://user-images.githubusercontent.com/9062443/45077482-edab0e80-b10a-11e8-8336-0edc71c117f9.png)

In the above diagram,GraphQL server and the database is integrated on a single node. The client (desktop / mobile ) communicates with GraphQL server over HTTP. The GraphQL server processes the request, fetches data from the database and returns it to the client.

## 2. GraphQL server integrating existing systems

This approach is helpful for companies which have lecgacy infrastructure and different APIs .GraphQL can be used to unify microservices, leagcy infrastructure and third-party APIs in the existing system .

![2_legacy_systems_02](https://user-images.githubusercontent.com/9062443/45077483-ee43a500-b10a-11e8-80ee-8e168e2ac15c.png)

In the above diagram, a GraphQL API acts as an interface between the client and the existing systems.Client applications talk to the GraphQL server which in turn resolves the query.

## 3. Hybrid Approach

Finally we can combine the above two approaches and build a GraphQL server.
In this architecture when request is received by the GraphQL server , the server will resolve the request. It will either retrieve data from connected database or from the integrated API's . This is shown in the figure given below.

![3_hybrid_02](https://user-images.githubusercontent.com/9062443/45077485-ee43a500-b10a-11e8-85cc-0ae156054e89.jpg)

<div style="page-break-after: always;"></div>


# Application Components

This section discusses the different GraphQL components and how they communicate with each other. The entire application components can be distinguished as-

|Sr No |  Description              |
|:----:|:--------------------------|
| 1    | Server Side Components    |
| 2    | Client Side Components    |

## Server Side Components

 **GraphQL server** forms the core component on the server side .GraphQL server allows to parse the queries coming from graphql client applications. Apollo Server is most commonly used implementation of GraphQL specification. Other server programming components include the following.

|Sr No |  Server Essentials   | Description
|:----:|:-------------|:---------------------------
| 1    | Schema| A GraphQL schema is at the center of any GraphQL server implementation and describes the functionality available to the clients which connect to it.
| 2    | Query | A GraphQL query is the client application request to retrieve data from database or legacy API's
| 3    | Resolver|Resolvers provide the instructions for turning a GraphQL operation into data. They resolve the query to data by defining resolver functions.

## GraphQL Client

|Sr No |  tool              | Description
|:----:|:-------------------|:-----------
| 1    | GraphiQL | Browser based interface for editing and testing GraphQL queries , mutations
| 2    | ApolloClient| Best tool to build GraphQL client applications.Integrates well with all javascript front-end

![1_app_components](https://user-images.githubusercontent.com/9062443/45077716-86418e80-b10b-11e8-8774-ce2600d09022.jpg)

The above diagram shows a client server architecture . The web server is built on NodeJs and Express framework  . A request is made to the Apollo GraphQL Server by a ReactJS application (built using Apollo Client library) or a  GraphiQL browser application.
The query will be parsed and validated against a schema defined in the server. If the request schema passes the validation,then the associated resolver functions will be executed. The resolver will contain code to fetch data from an API or a database .

<div style="page-break-after: always;"></div>

  
# HelloWorld Example

We will create a simple API that returns a greeting message and access it using **GraphiQL** . This example is based on NodeJS,Express and Apollo server.
You will learn to put together all the concepts together .

## Step 1: Setting up Express

ExpressJS is a web application framework that helps you build websites, web applications.In this example,we will build a GraphQL API on top of the Express framework.

a. Create a folder **hello-world-server** navigate to the same folder from terminal.Add a **package.json** , and give a name to the package . Since this package will be used internally we shall declare it private.

```javascript
{
    "name":"hello-world-server",
    "private":true
}
```

b. Install the dependencies for Express server as shown

```javascript
C:\Users\Admin\hello-world-server>npm install express body-parser cors

```

*body-parser* is a middleware package which helps Express to handle HTTP Post requests efficiently.*cors* is another middleware package that handles cross-origin resource sharing.

c. Create a **server.js** file within the project folder and type the following in it.

```javascript

 const bodyParser = require('body-parser')
 const cors = require('cors')
 const express = require('express')
 const port = process.env.PORT|| 9000
 const app = express()
 //register middleware
 app.use(bodyParser.json() , cors())
 app.listen(port , ()=> console.log(`server is up and running at ${port}`))


```

d. To Verify if the Express server is up and running execute the following in the terminal window.

```javascript
 C:\Users\Admin\hello-world-server>node server.js
```

The following output will be diaplayed in the server console.This shows that the express server is running on port 9000

```javascript
server is up and running at 9000
```

e. open the browser and type `http://localhost:9000` you will get the following screen.
!["express"](https://user-images.githubusercontent.com/9062443/44002340-a6ab8992-9e5e-11e8-8907-81ec94ad27df.png "express")

To stop the server press *ctr+c*.

## Step 2: Install GraphQL and Apollo server

Now that Express is configured , the next step will be to download the following GraphQL dependencies-
a.  graphql
b. graphql-tools
c. apollo-server-express@1 modules
We shall use Apollo server v1.0 as it is a stable release
Type the following commands to install this dependencies.

```javascript
 C:\Users\Admin\hello-world-server>npm install graphql graphql-tools apollo-server-express@1
```

We can verify if these dependencies are installed successfully by checking the **package.json** file that we created previously.

```javascript
{
    "name": "hello-world-server",
    "private": true,
    "dependencies": {
        "apollo-server-express": "^1.4.0",
        "body-parser": "^1.18.3",
        "cors": "^2.8.4",
        "express": "^4.16.3",
        "graphql": "^0.13.2",
        "graphql-tools": "^3.1.1"
    }
}

```

## Step 3: Define the Schema

A GraphQL schema defines what kind of object can be fetched from a service, and what fields it has.The schema can be defined using **GraphQL Schema Definition Language**. Add the following code snippet in the **server.js** file.

```javascript

  // Adding Type Definitions

  const typeDefinition = `
     type Query  {
         greeting: String
     }
  `
```

Here, the query contains a `greeting` attribute that returns a `string` value.

## Step 4: Create a  Resolver

a.The next step is to add some code to process the request for greeting field. This is specified in a **resolver**. The structure of the resolver function must  match the schema. Add the following code snippet in the **server.js** file.

```javascript

  // Adding resolver

  const  resolverObject = {
      Query : {
          greeting: () => 'Hello GraphQL  From TutorialsPoint !!'
      }
  }
```

b. Bind the schema and resolver using `makeExecutableSchema`. This function is pre-defined in the graphql-tools module.Add the following code snippet in the **server.js** file.

```javascript
  const {makeExecutableSchema} = require('graphql-tools')
  const schema = makeExecutableSchema({typeDefs:typeDefinition , resolvers:resolverObject})

```

## Step 4: Define routes to fetch data from ReactJS / GraphiQL application

Add the following code snippet in the **server.js** file.

```javascript
  const {graphqlExpress , graphiqlExpress} = require('apollo-server-express')
    //create routes for graphql and graphiql
   app.use('/graphql',graphqlExpress({schema}))
   app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))


```

The `graphqlExpress` function helps to register the route `http://localhost:9000/graphql`. The ReactJS application can use this endpoint to query data. Similarly, the `graphqliExpress` function helps to register the route `http://localhost:9000/graphiql`. This will be used by the GraphiQL browser client to test the API.

The complete **server.js** code is as given below

```javascript

 const bodyParser = require('body-parser')
 const cors = require('cors')
 const express = require('express')
 const port = process.env.PORT||9000
 const app = express()
 app.use(bodyParser.json() , cors())

 const typeDefinition = `
 type Query  {
     greeting: String
 }`

 const  resolverObject = {
    Query : {
        greeting: () => 'Hello GraphQL  From TutorialsPoint !!'
    }
}
const {makeExecutableSchema} = require('graphql-tools')
 const schema = makeExecutableSchema({typeDefs:typeDefinition , resolvers:resolverObject})
const {graphqlExpress,graphiqlExpress} = require('apollo-server-express')
app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))
app.listen(port , ()=> console.log(`server is up and running ${port}`))

```

## Step 5: Start the Application

Execute **server.js** using Node.js .

```javascript
C:\Users\Admin\hello-world-server>node server.js
```

## Step 6: Test the GraphQL API

Open the  browser and type `http://localhost:9000/graphiql`

In the query tab of GraphiQL, enter the following -

```javascript
  {
  greeting
  }

```

The response from the server is given below.

```javascript
  {
  "data": {
    "greeting": "Hello GraphQL  From TutorialsPoint !!"
  }
}


```

The following image illustrates the response

!["graphiql"](https://user-images.githubusercontent.com/9062443/44010356-80865618-9ecf-11e8-8297-fe947766a200.png "graphql")

*note*: please ensure apollo server version 1.0 is used

<div style="page-break-after: always;"></div>


# Type System

GraphQL is a strongly typed language. Type System defines the various data types that can be used in a GraphQL application.The type system helps to define the schema , which is a contract between client and server . The commonly used GraphQL data types are as follows-

|Sr No |  Types              |  Description
|:----:|:--------------------------|:------------------
| 1    | Scalar    | Stores a single value
| 2    | Object     | Shows what kind of object can be fetched
| 3   | Query    | Entry point type to other specific types
| 4    | Mutation   | Entry point for data manipulation
| 5   | Enum   | Useful in a situation where you need the user to pick from a prescribed list of options

## Scalar Types

These are primitive data types. Scalar types can store only a  single value . The default scalar types that GraphQL offers are:

- **Int** :Signed 32 bit Integer
- **Float**: Signed double precision floating point value
- **String** : UTF‐8 character sequence
- **Boolean** :true or false
- **ID** : A unique identifier, often used as a unique identifier to fetch an object or as the key for a cache.

The Syntax for defining a scalar type is -

```javascript
   field: data_type
```

The snippet given below defines a field named greeting which returns String value

```javascript
   greeting: String
```

## Object Types

The object type is the most common type used in a schema and represents a group of fields. Each field inside an object type maps to another type, thereby allowing nested types. In other words, an object type is composed of multiple scalar types or Object types.
The Syntax for defining an Object type is

```javascript
type object_type_name
{
   field1: data_type
   field2:data_type
   ....
   fieldn:data_type
 }
```

Consider the following code snippet-  

```javascript
//Define an object type

type Student {
  stud_id:ID
  firstName: String
  age: Int
  score:Float
}


//Defining a GraphQL schema

type Query
{
 stud_details:[Student]
}

```

The example given above defines an object data-type  `Student`. The `stud_details` field in the root Query schema will return a list of Student objects.

## The Query type

A GraphQL query is to used to fetch data. It is similar to requesting a resource in REST-based APIs. Simply put, the Query type is the request send from a client application to the GraphQL server.GraphQL uses the Schema Definition Language(SDL) to define a Query.Query type is one of the many root-level types in GraphQL.

The syntax for defining a Query is as given below

 ```javascript
 type Query  {
     field1: data_type
     field2:data_type
     field2(param1:data_type,param2:data_type,...paramN:data_type):data_type
 }
 ```

Following is an example of defining a Query :

```javascript
 type Query  {
     greeting: String
 }
```

## Mutation Type

Mutations are operations sent to the server to create, update or delete data. These are analogous to the PUT, POST, PATCH and DELETE verbs to call REST-based APIs.

Mutation is one of the root-level data-types in GraphQL.The Query type defines the entry-points for data-fetching operations whereas the Mutation type specifies the entry points for data-manipulation operations.  

The syntax for defining a Mutation type is as given below

 ```javascript
 type Mutation {
     field1: data_type
     field2(param1:data_type,param2:data_type,...paramN:data_type):data_type
 }
 ```

For example, we can define a mutation type to add a new Student as given below:

```javascript
  type Mutation {
  addStudent(firstName: String, lastName: String): Student
}

```

### Enum Type  

An Enum is similar to a scalar type. Enums are useful in a situation where the value for a field must be from a prescribed list of options.

The syntax for defining an Enum type is -  

```javascript
  type enum_name{
  value1
  value2
}

```

Following snippet illustrates how an enum type can be defined -  

```javascript
  type Days_of_Week{
  SUNDAY
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
  SATURDAY
}

```

### List Type

Lists can be used to represent an array of values of a specific type. Lists are defined with a type modifier `[]` that wraps object types, scalars, and enums.

The following syntax can be used to define a  list type -

```javascript


field:[data_type]

```

The below example defines a list type `todos`  

```javascript
type Query {
  todos: [String]
}
```

### Non-Nullable Type  

By default, each of the core scalar types can be set to null. In other words, these types can either return a value of the specified type or they can have no value.To override this default and specify that a field must be defined,an exclamation mark (!) can be appended to a type.This ensures the presence of the value in results returned by the query.  
The following syntax can be used to define a non-nullable field

```javascript
field:data_type!
```

In the below example, `stud_id` is declared a mandatory field

```javascript
type Student {
    stud_id:ID!
    firstName:String
    lastName:String
    fullName:String
    college:College
}

```

<div style="page-break-after: always;"></div>


# Schema

A GraphQL schema is at the core of any GraphQL server implementation. It describes the functionality available to the client applications that connect to it. We can use any programming language to create a GraphQL schema and build an interface around it.

The GraphQL runtime defines a generic graph based schema to publish the capabilities of the data service it represents. Client applications an query the schema within its capabilities. This approach decouples clients from servers
and allows both of them to evolve and scale independently.

In this tutorial, we are using Apollo server for executing GraphQL queries. The makeExecutableSchema function in graphql helps you to bind the schema and resolvers. The syntax for using the makeExecutableSchema function is as given below

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
|   1  | typeDefs|This is a required argument. It represents a GraphQL query as a UTF-8 string.
|    2 | resolvers | This is an optional argument (empty object by default). This should be an object.
| 3 | logger | This is an optional argument. This can be used to print errors to the server console.
| 4 | parseOptions | This is an optional argument .It allows customization of parse when specifying typeDefs as a string.
| 5| allowUndefinedInResolve |  This is true by default. When set to false, causes your resolve functions to throw errors if they return undefined
| 5 |  resolverValidationOptions | This is an optional argument.It accepts an object with boolean properties
| 6| inheritResolversFromInterfaces| This is an optional argument. It accepts a boolean argument to check resolvers object inheritance.

## Illustration

Let us create a simple application to understand schema . This application will create schema for querying  list of students from the server . The student data will be stored in a flat file and we will use a node module called **notarealdb** to fake a database and read from flat file .

### Step 1 :  Download and Install required dependencies for the project  

- Create a folder named **schema-app** .Change your directory to **schema-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.

### Step 2: Create a schema

Add **schema.graphql** file in the project folder **schema-app** and add the following code

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

### Step 3: Create Resolvers

 Create a file **resolvers.js** in the project folder and add the following code

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

Here `greeting` and `students` are the resolvers that handle the query .`students` resolver function returns a list of students from the data access layer.To access resolver functions outside the module `Query` object has to be exported using module.exports

### Step 4: Run the application

- Create a  **server.js** file.Refer step 8 in the Environment Setup Chapter

- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client to test the application.Open browser and type the url `http://localhost:9000/graphiql`

Type the following query in the editor.

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

**Note** : We can replace the students.json with a RESTful api call to retrieve student data or even a real database like mysql or mongodb. GraphQL becomes a thin wrapper around your original application layer to improve performance .

<div style="page-break-after: always;"></div>


# Resolver

Resolver is a collection of functions that generates response for a  GraphQL query. Simply put, a resolver acts as a GraphQL query handler.Every resolver function in a GraphQL schema accepts four positional arguments as given below:

`fieldName:(root, args, context, info) => { result }`

An example of resolver functions are shown below.

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

- Create a folder named **resolver-app** .Change your directory to **resolver-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.

### Step 2: Create a schema

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

### Step 3: Create Resolvers

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

## Step 4: Run the application

- Create a server.js file.Refer step 8 in the Environment Setup Chapter.

- Execute the command `npm start` in the terminal.The server will be up and running on 9000 port.Here , we will use GraphiQL as a client to test the application.

Open browser and type the url `http://localhost:9000/graphiql`.
Type the following query in the editor.  

```javascript

{
  studentById(id:"S1001"){
    id
    firstName
    lastName
  }
  
}

```

The output will be as shown below

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


<div style="page-break-after: always;"></div>


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

In this example we have set of students stored in a json file each student model has fields like firstName,lastName , id  but no fullName field available. We will discuss here how to make a query to retrieve fullName of all students. For this we need to create fullName field in schema and  fullName field in resolver . Let us see how to do this in the illustration.

### Step 1 :  Download and Install required dependencies for the project

- Create a folder named **query-app** .Change your directory to **query-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.

### Step 2: Create a schema

Add schema.graphql file in the project folder query-app and add the following code-

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

Note that there is no fullName field in the the students.json file. However, we need to fetch the fullName of the student via a query. The fullName, in this case will be a **custom field** that isn't available with the data source.  

### Step 3: Create Resolver

Create a file resolvers.js in the project folder and add the following code

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

  //for each single student object returned,resolver is invoked
const Student={
    fullName:(root,args,context,info)=>{
        return root.firstName+":"+root.lastName
    }
  }

module.exports = {Query,Student}


```

## Step 4: Run the application

- Create a server.js file.Refer step 8 in the Environment Setup Chapter.  
- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client   to test the application.

Open browser and type the url `http://localhost:9000/graphiql` Type the following query in the editor.  

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

### Step 1: Edit the Schema

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

### Step 2: Modify the **resolvers.js**

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

### Step 3: Test the application

Open the terminal window,navigate to the project folder. Type the command -`npm start`.Launch the browser and enter the URL `http://localhost:9000/graphiql`. Enter the following query in the GraphiQL window

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

### Step 1 : Edit schema file

 Add a sayHello field which takes a string parameter and returns a string.The name values will be dynamic in client application.

 ```javascript

 type Query  {
    sayHello(name:String!):String
}

 ```

### Step 2: Edit resolver.js file

Add a sayHello resolver which takes parameter as below .

```javascript
sayHello:(root,args,context,info)=> `Hi ${args.name} GraphQL server says Hello to you!!`
```

### Step 3: Declare query variable in GraphiQL

- Variable is declared with `$` followed by name of variable for example `$myname_Variable`
- Next the variable declared `$myname_Variable` has to be used with a named query syntax . The query `myQuery` takes string value and passes it on to `sayHello` as shown below.

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

### Step 2: Edit resolvers.js file

The resolver function setFavouriteColor takes root and args.
The enum value passed to function at runtime can be accessed through args parameter.

```javascript

setFavouriteColor:(root,args)=>{
        return  "Your Fav Color is :"+args.color;

    }
```

### Step 3: Declare a query variable in GraphiQL

query is named `query_to_setColor` which takes a variable of the named `$color_variable` of the type ColorType.This variable is passed on to method `setFavouriteColor`

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


<div style="page-break-after: always;"></div>


# Mutation

Mutation queries modify data in the data store. It can be used to insert, update, or delete data.  
Mutations are defined as a part of the schema. Mutation query must  return a value.

The syntax of a mutation query is as given below:

```javascript
mutation{
    someEditOperation(dataField:"valueOfField"):returnType
 }
```

## Illustration

Let us understand how one can add new student record into the datastore using a  mutation query.

### Step 1: Download and Install required dependencies for the project

- Create a project folder by the name **mutation-app**.Change your directory to **mutation-app** from the terminal.  
- Follow steps 3 to 5 explained in the Environment Setup chapter.

### Step 2: Create a **schema.graphql** file

Add schema.graphql file in the project folder mutation-app and add the following code

```javascript
type Query {
  greeting:String
}

type Mutation {
    createStudent(collegeId:ID,firstName:String,lastName:String):String
}
  
```

Note that the function createStudent returns a String type this will be the unique identifier(ID) which will be generated after creating a student.

### Step 3: Create a resolver.js file

Create a file resolvers.js in the project folder and add the following code.  

```javascript
 const db = require('./db')
  const Mutation ={
    createStudent:(root,args,context,info)=>{

        return db.students.create({collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName})

    }

}


const Query = {
  greeting:()=>"hello"
}

module.exports = {Query,Mutation}
```

The mutation function points to students collection in the datastore . To add a new student invoke the create method in students collection. The *args* object will contain the parameters which are passed in the query.The create method of students collection will return the id of a newly created student object.

## Step 4: Run the application

- Create a server.js file.Refer step 8 in the Environment Setup Chapter.
- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client to test the application.  

Open browser and type the url `http://localhost:9000/graphiql` Type the following query in the editor.  

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

To verify if the student object is created,since a student is created we can use the `studentById` query, you can also open the **students.json** file from **data** folder to verify the id. To use `studentById`  query do the following

- Edit the schema.graphql as given below

```javascript
type Query {
    studentById(id:ID!):Student
}


type Student {
    id:ID!
    firstName:String
    lastName:String
    collegeId:String

}
````

- Edit the resolver.js file as given below.

```graphql
const db = require('./db')

const Query = {
    studentById:(root,args,context,info) => {
        return db.students.get(args.id);
    }

}
const Mutation ={
    createStudent:(root,args,context,info)=>{

        return db.students.create({collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName})

    }

}

module.exports = {Query,Mutation}

```

This will be the query to get student by the unique id returned from the mutation query.

```javascript
{
    studentById(id:"SkQtxYBUm"){
    id
    firstName
    lastName
  }
}

```

The response from server is given below-

```javascript

{
  "data": {
    "studentById": {
      "id": "SkQtxYBUm",
      "firstName": "Tim",
      "lastName":"George"
    }
  }
}


```

## Returning an Object in mutation

It is a best practice to return an object in mutation.Say for example, the client application wants to fetch student and college details.In this case rather than making two different requests, we can create a query that returns an object that contains students and their college details.

### Step 1: Edit schema file

Add a new method  named `addStudent_returns_object` in mutation type of **schema.graphql** . Lets give this feature of accessing college through the student . Add college type in schema file.

```javascript

 type Mutation {
   addStudent_returns_object(collegeId:ID,firstName:String,lastName:String):Student

  createStudent(collegeId:ID,firstName:String,lastName:String):String
}

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
    college:College
}

```

### Step 2: Update the **resolvers.js** file as below

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

//for each single student object returned,resolver is invoked
const Student={
    college:(root)=>{
        return db.colleges.get(root.collegeId);
    }
  }

module.exports = {Query,Student,Mutation}
```

### Step 3: Start the server and type the request query in GraphiQL

```javascript
mutation {
  addStudent_returns_object(collegeId:"col-101",firstName:"Susan",lastName:"George"){
    id
    firstName
    college{
      id
      name
    }
  }
}

```

The response will be as below , this query add a new student as well as retrieves that object along with college object. This saves round trips to the server

```javascript
  {
  "data": {
    "addStudent_returns_object": {
      "id": "rklUl08IX",
      "firstName": "Susan",
      "college": {
        "id": "col-101",
        "name": "AMU"
      }
    }
  }
}

```


<div style="page-break-after: always;"></div>


# Validation

 While adding or modifying data it is important to validate the user input.For example, we may need to ensure that the value of a field is always not null. We can use ! (non-nullable) type marker in GraphQL to perform such validation.

The syntax for using the ! type marker is as given below:

 ```javascript
  type TypeName {
      field1:String!,
      field2:String!,
      field3:Int!
  }

```

The above syntax ensures that all the fields are not null.

If we want to implement additional rules like checking for a string's length or checking if a number is within a given range, we can define custom validaters. The custom validation logic will be a part of the resolver function. Let us understand this with the help of an example.

## Illustration : Implementing Custom Validators

 Let us create a signup form with basic validation . The form will have email ,firsname and password fields.

### Step 1: Download and Install required dependencies for the project

- Create a folder named **validation-app** .Change the directory to **validation-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.
  
### Step 2: Create a schema  

 Add schema.graphql file in the project folder **validation-app** and add the following code

  ```javascript

type Query {
  greeting:String
}

type Mutation {

   signUp(input:SignUpInput):String
}

input SignUpInput {
    email:String!,
    password:String!,
    firstName:String!
}

```

Note to reduce the number of parameters in signUp function we can use the input type  SignUpInput.  So signUp function takes only one parameter of the type `SignUpInput`.  

### Step 3: Create Resolvers

Create a file **resolvers.js** in the project folder and add the following code-

```javascript
const Query = {
  greeting:()=>"Hello"
}
const Mutation ={
    signUp:(root,args,context,info)=>{

const {email,firstName,password} = args.input;

const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail= emailExpression.test(String(email).toLowerCase())
    if(!isValidEmail)
    throw new Error("email not in proper format")

    if(firstName.length>15)
      throw new Error("firstName should be less than 15 characters")

     if(password.length <8 )
      throw new Error("password should be minimum 8 characters")


        return "success";
    }

}

module.exports={Query,Mutation}
```

The resolver function `signUp` accepts parameters `email`,`password` and `firstName` . These will be passed through *input* variable so that it can be accessed through `args.input`

### Step 4: Run the application

- Create a server.js file.Refer step 8 in the Environment Setup Chapter.

- Execute the command npm start in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client   to test the application.

Open the browser and type the URL `http://localhost:9000/graphiql` Type the following query in the editor.

```javascript

 mutation doSignUp($input:SignUpInput) {
   signUp(input:$input)
}


```

Since input to signup function is a complex type , we need to use query variables in graphiql,for this we need to first give a name to query lets call it doSingUp, the `$input` is the query variable .

Following is the query variable, this must be entered in query variables tab of graphiql

```javascript
 {
   "input":{
     "email": "abc@abc",
    "firstName": "kannan",
    "password": "pass@1234"
  }
}

```

following is the response from server , errors array contains the details of the validation errors.

```javascript
{
  "data": {
    "signUp": null
  },
  "errors": [
    {
      "message": "email not in proper format",
      "locations": [
        {
          "line": 2,
          "column": 4
        }
      ],
      "path": [
        "signUp"
      ]
    }
  ]
}


```

Enter a proper input for each field ,for example-

```javascript
     {
   "input":{
     "email": "abc@abc.com",
    "firstName": "kannan",
    "password": "pass@1234"
  }
}

```

The response will be as below

```javascript
  {
  "data": {
    "signUp": "success"
  }
}

```

In the below query we are not providing the password.

```javascript
 {
   "input":{
     "email": "abc@abc.com",
    "firstName": "kannan"
  }
}

```

If a required field is not provided , then qraphql server will give following error.

```javascript

{
  "errors": [
    {
      "message": "Variable \"$input\" got invalid value {\"email\":\"abc@abc.com\",\"firstName\":\"kannan\"}; Field value.password of required type String! was not provided.",
      "locations": [
        {
          "line": 1,
          "column": 19
        }
      ]
    }
  ]
}

```

<div style="page-break-after: always;"></div>


# JQuery Integration

Web applications may want to send and retrieve data asynchronously (in the background).AJAX allows websites to load content onto the screen without refreshing the page.jQuery provides several methods for AJAX functionality thus making it easier to use AJAX . In this chapter we shall learn how we can integrate GraphQL with jQuery.  
  
Consider an application using client server architecture. We can build a front end webpage that requests data from a GraphQL server.The webpage will make ajax calls using jQuery to the GraphQL server.

To integrate GraphQL with JQuery,let us inspect the GraphiQL request headers and understand the request parameters.  

Start the hello-world app (refer chapter 6 for illustration).Type the  graphql query `{greeting}` in the GraphiQL window . Right click and inspect or (ctrl+shift+I) on chrome , go to the network tab as shown below

![1_request_header](https://user-images.githubusercontent.com/9062443/44342005-4f327280-a4a7-11e8-87ff-8afd3bf3547e.png)

From the simple hello world example we can understand that the http method used is **POST** .Now in the browser scroll down to the header section to view the *request payload* .  
Once you click on **view code** you will see following in request payload section of chrome .  

```javascript
  {"query":"{\n  greeting\n}","variables":null,"operationName":null}

```

Also note the request url `http://localhost:9000/graphql` that should be called from client application.

## Illustration

## Setting up the Server

### Step 1 : Download and Install required dependencies for the project

- Create a folder named **jquery-server-app** .Change your directory to **jquery-server-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.  

### Step 2: Create a schema

Add schema.graphql file in the project folder jquery-server-app and add the following code  

```javascript
type Query
{
    greeting: String
   sayHello(name:String!):String
}

```

The file has defined two queries `greeting` and `sayHello`. The `sayHello` query accepts a string parameter returns another string.The parameter to the `sayHello()` function is not null.

### Step 3 : Create Resolvers

Create a file resolvers.js in the project folder and add the following code

```javascript

const Query =
{
   greeting: () => 'Hello GraphQL  From TutorialsPoint !!' ,
   sayHello:(root,args,context,info)=> `Hi ${args.name} GraphQL server says Hello to you!!`

}

module.exports = {Query}

```

Here `greeting` and `sayHello` are two resolvers .In `sayHello` resolver the value passed to the name parameter can be accessed through `args`.To access resolver functions outside the module Query object has to be exported using module.exports

### Step 4: Run the application

- Create a server.js file.Refer step 8 in the Environment Setup Chapter.

- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client to test the application.Open browser and type the url `http://localhost:9000/graphiql` Type the following query in the editor.

```javascript
{
   greeting,
   sayHello(name:"Mohtashim")
}

```

The response from server is as given below-

```javascript
{
  "data": {
    "greeting": "Hello GraphQL  From TutorialsPoint !!",
    "sayHello": "Hi Mohtashim GraphQL server says Hello to you!!"
  }
}

```

## Setting up the Client

### Step 1: Create a new folder **jquery-client-app** outside the current project folder

### Step 2: Create an html page **index.html** for JQuery integration

We will create a client application in jquery and invoke both the methods. Following is the code for **index.html** file.
The **index.html** page sends requests to the server when the buttons Greet and SayHello are clicked. We will make asynchronous request using `$.ajax()` function.

```javascript
<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
$(document).ready(function(){

    $("#btnSayhello").click(function(){

       const name = $("#txtName").val();
       console.log(name);
       $("#SayhelloDiv").html('loading....');

       $.ajax({url: "http://localhost:9000/graphql",

        contentType: "application/json",type:'POST',
    data: JSON.stringify({ query:`{
                    sayHello(name:"${name}")
              }`
}),
        success: function(result){
            console.log(JSON.stringify(result))
            $("#SayhelloDiv").html("<h1>"+result.data.sayHello +"</h1>");
        }});


    });


    $("#btnGreet").click(function(){

         $("#greetingDiv").html('loading....');
         //https://kannan-first-graphql-app.herokuapp.com/graphql
        $.ajax({url: "http://localhost:9000/graphql",

        contentType: "application/json",
type:'POST',
        data: JSON.stringify({
query:`{greeting}`
}),
        success: function(result){
            $("#greetingDiv").html("<h1>"+result.data.greeting+"</h1>");
        }});
    });
});
</script>
</head>
<body>
        <h1>Jquery Client </h1>

<hr/>
        <section>
                    <button id="btnGreet">Greet</button>
                    <br/> <br/>
                    <div id="greetingDiv">
                  </div>


        </section>
        <br/> <br/> <br/>
        <hr/>

        <section>
             Enter a name:<input id="txtName" type="text" value="kannan"/>
                <button id="btnSayhello">SayHello</button>
                <div id="SayhelloDiv">
              </div>


    </section>


</body>
</html>

```

Open this file in the browser and click on the button to see the response. The output will be as given below
![2_jquery_output](https://user-images.githubusercontent.com/9062443/44388206-2791e780-a545-11e8-9df6-20fc55625ac7.png)


<div style="page-break-after: always;"></div>


# React Integration

React is a Javascript library for building user interfaces.This chapter explains how one can integrate GraphQL with a React application.  

The quickest way to set up a react project is by using  the *Create React App* tool. Follow the steps given below-

## Setting up the Server

### Step 1 : Download and Install required dependencies for the project

- Create a folder **react-server-app**.Change your directory to **react-server-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.  

### Step 2: Create a schema

Add schema.graphql file in the project folder **react-server-app** and add the following code  

```javascript

type Query
{
    greeting: String
   sayHello(name:String!):String
}

```

The file has defined two queries `greeting` and `sayHello`. The `sayHello` query accepts a string parameter returns another string.The parameter to the `sayHello()` function is not null.

### Step 3 : Create Resolvers

Create a file resolvers.js in the project folder and add the following code-

```javascript
const Query =
{
   greeting: () => 'Hello GraphQL  From TutorialsPoint !!' ,
   sayHello:(root,args,context,info)=> `Hi ${args.name} GraphQL server says Hello to you!!`

}

module.exports = {Query}

```

Here `greeting` and `sayHello` are two resolvers .In the`sayHello` resolver the value passed to the name parameter can be accessed through `args`.To access resolver functions outside the module Query object has to be exported using `module.exports`.  

### Step 4: Run the application  

- Create a server.js file.Refer step 8 in the Environment Setup Chapter.

- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a       client to test the application.
- Open browser and type the url `http://localhost:9000/graphiql` .Type the following query in the editor.  

```javascript
{
   greeting,
   sayHello(name:"Mohtashim")
}

```

The response from server is as given below-

```javascript

{
  "data": {
    "greeting": "Hello GraphQL  From TutorialsPoint !!",
    "sayHello": "Hi Mohtashim GraphQL server says Hello to you!!"
  }
}

```

## Setting up the Client

Open a new terminal for client . The server terminal should be kept running before executing the client application. React application will be running on port number 3000 and server application on port number 9000.

### Step 1: Create a react project hello-world-client

In the client terminal type the following command .  

`npx create-react-app hello-world-client`  

This will install everything needed for a typical react application. The **npx** utility and **create-react-app** tool creates a  project with name hello-world-client.Once the installation is completed open the project in VSCode.

### Step 2 :Start hello-world-client

Change the current folder path in the terminal to hello-world-client. Type `npm start` to launch the project.This will run a development server at port 3000 and will automatically open the browser and load the index page

This is shown in the screenshot given below:
![1_react_launch](https://user-images.githubusercontent.com/9062443/45262323-58718800-b432-11e8-89d9-daf6ed707f98.png)

### Step 3 : Modify the App Component

 In the App.js inside src folder add two functions - one to load greeting and and another to load sayHello messages.

Following is the `loadGreeting` function which sends  GraphQL query for greeting.

```javascript

async function loadGreeting(){
  const response=await fetch('http://localhost:9000/graphql', {
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({query:'{greeting}'})

  })

  const rsponseBody= await response.json();
  return rsponseBody.data.greeting;

  console.log("end of function")

}


```

Following is the `loadSayhello` function which sends  GraphQL query for `sayHello`.

```javascript

async function  loadSayhello(name){
  const response=await fetch('http://localhost:9000/graphql', {
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({query:`{sayHello(name:"${name}")}`})

  })



```

The complete App.js file is shown below

```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

async function loadGreeting(){
  const response=await fetch('http://localhost:9000/graphql', {
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({query:'{greeting}'})

  })

  const rsponseBody= await response.json();
  return rsponseBody.data.greeting;

  console.log("end of function")

}

 async function  loadSayhello(name){
  const response=await fetch('http://localhost:9000/graphql', {
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({query:`{sayHello(name:"${name}")}`})

  })

  const rsponseBody= await response.json();
  return rsponseBody.data.sayHello;

 }

class App extends Component {

  constructor(props){
    super(props);
    this.state = {greetingMessage:'',sayHelloMessage:'',userName:''}

    this.updateName = this.updateName.bind(this);
    this.showSayHelloMessage = this.showSayHelloMessage.bind(this);
    this.showGreeting = this.showGreeting.bind(this);
  

  }

  showGreeting(){
    loadGreeting().then(g=>this.setState({greetingMessage:g+" :-)"}))

  }
  showSayHelloMessage(){
    const name =this.state.userName;
    console.log(name)
    loadSayhello(name).then(m=>this.setState({sayHelloMessage:m}))
  }

  updateName(event){
    this.setState({userName:event.target.value})

  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br/><br/>
        <section>
                    <button id="btnGreet" onClick={this.showGreeting}>Greet</button>
                    <br/> <br/>
                    <div id="greetingDiv">
                    <h1>
                   {this.state.greetingMessage}
                   </h1>
                  </div>

        </section>


         <hr/>

         <section>
             Enter a name:<input id="txtName" type="text" onChange={this.updateName}
             value={this.state.userName}/>
                <button id="btnSayhello" onClick={this.showSayHelloMessage}>SayHello</button>
              <br/>
              user name is:{this.state.userName}    <br/>
              <div id="SayhelloDiv">
               <h1> {this.state.sayHelloMessage}  </h1>
              </div>

    </section>


      </div>
    );
  }
}

export default App;

```

Once both applications are running click on the greet button.After that enter a name in the textbox and click on sayHello button.  Output will be as given below.

![react-ouput](https://user-images.githubusercontent.com/9062443/44403682-b6692900-a572-11e8-883b-1c8d50eada16.png)


<div style="page-break-after: always;"></div>


# Apollo Client

We have used Apollo Server to build graphql specification on server side.It is quick and easy to build production ready GraphQL server.Now let us look at the client side.

Apollo Client is the best way to use GraphQL to build client applications. The client is designed to help developer quickly build a UI that fetches data with GraphQL, and can be used with any JavaScript front-end.

Apollo Client supports following platforms.

|Sr No |  Platform |  Framework
|:----:|:----------|:------------------
|  1 | Javascript  | React,Angular,Vue,Meteor,Ember
|  2 | WebComponents  | Polymer , lit-apollo
|  3 | Native Mobile  | Native Android with Java, Native iOS with Swift

One of the major feature of apollo client is caching. `apollo-boost` is a convenience package which brings in a bunch of other dependencies.  

## Setting Up Server

### Step 1 : Download and Install required dependencies for the project

- Create a folder **apollo-server-app**.Change your directory to **apollo-server-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.  

### Step 2: Create a schema

Add schema.graphql file in the project folder **apollo-server-app** and add the following code  

```javascript

type Query
{
        students:[Student]
 }

type Student {
    id:ID!
    firstName:String
    lastName:String
    college:College
}

type College {
    id:ID!
    name:String
    location:String
    rating:Float
}
```

### Step 3: Add Resolvers  

Create a file resolvers.js in the project folder and add the following code  

```javascript

const db = require('./db')

const Query = {
     //resolver function for students returns list
   students:()=>db.students.list(),
}
const Student={
      college:(root)=>{
      return db.colleges.get(root.collegeId);
   }
}

module.exports = {Query,Student}

```

### Step 4: Run the application  

- Create a server.js file.Refer step 8 in the Environment Setup Chapter.
- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a  client to test the application.Open browser and type the url `http://localhost:9000/graphiql` Type the following query in the editor.  

```javascript

 {
        students{
          id
          firstName
          college{
            name
          }
        }
    }
```  

The response for the query will be as given below  

```javascript
{
  "data": {
    "students": [
      {
        "id": "S1001",
        "firstName": "Mohtashim",
        "college": {
          "name": "CUSAT"
        }
      },
      {
        "id": "S1002",
        "firstName": "Kannan",
        "college": {
          "name": "AMU"
        }
      },
      {
        "id": "S1003",
        "firstName": "Kiran",
        "college": {
          "name": "AMU"
        }
      }
    ]
  }
}

```

## Setting up the Client  

Open a new terminal for client . The server terminal should be kept running before executing the client application. React application will be running on port number 3000 and server application on port number 9000.

### Step 1: Create a react application

In the client terminal type the following command  

`npx create-react-app hello-world-client`  

This will install everything needed for a typical react application. The npx utility and create-react-app tool creates a project with name hello-world-client.Once the installation is completed open the project in VSCode.

### Step 2 :Start hello-world-client  

Change the current folder path in the terminal to hello-world-client. Type `npm start` to launch the project.This will run a development server at port 3000 and will automatically open the browser and load the index page  
This is shown in the screenshot given below:

![1_react_launch](https://user-images.githubusercontent.com/9062443/45262323-58718800-b432-11e8-89d9-daf6ed707f98.png)

### Step 3 :Install apollo client libraries  

To install an apollo client open a new terminal and be in current project folder path .Type following command.

```javascript
    npm install apollo-boost graphql
```

This will download the graphql libraries for client side and also the apollo boost package.We can cross verify this by typing `npm view apollo-boost dependencies`.This will have many dependencies as shown below-

```javascript
  { 'apollo-cache': '^1.1.15',
  'apollo-cache-inmemory': '^1.2.8',
  'apollo-client': '^2.4.0',
  'apollo-link': '^1.0.6',
  'apollo-link-error': '^1.0.3',
  'apollo-link-http': '^1.3.1',
  'apollo-link-state': '^0.4.0',
  'graphql-tag': '^2.4.2' }

```

We can clearly see that apollo-client library installed.

### Step 4 : Modify the App Component in index.js file

With apollo client we can directly call server without the use of `fetch` api. Also the queries and mutations should not be embedded in a string made with back tick notation.This is because, the `gql` function directly parses the queries. This means, a programmer can directly write queries in the the same way when writing queries in GraphiQL tool.
`gql` is a tag function which will parse the template string written in back tick notation to graphql query object. The apollo client query method returns a promise.

Following shows how to import ApolloClient

```javascript

import {ApolloClient ,HttpLink , InMemoryCache} from 'apollo-boost'


const endPointUrl = 'http://localhost:9000/graphql'
const client  = new ApolloClient({
 link: new HttpLink({uri:endPointUrl}),
 cache:new InMemoryCache()
});

```

Following code shows how to use gql function . The `loadStudentsAsync` function using graphql client to query the server.In the previuos  chapter we discussed how to use `fetch` api for HTTP requests.

```javascript

async function loadStudentsAsync() {
    const query=gql`
    {
        students{
          id
          firstName
          lastName
          college{
            name
          }
        }
    }
    `
   const {data} = await client.query({query}) ;
   return data.students;
}


```

For simplicity you only need to keep the index.js in src folder and index.html in public folder all other files auto generated can be removed . Directory structure is given below.

```javascript
hello-world-client /

      -->node_modules
      -->public
           index.html
       -->src
           index.js
      -->package.json

```

Following is the **index.js** in react application.

```javascript

import React , {Component} from 'react';
import ReactDOM from 'react-dom';

// apollo client

import {ApolloClient ,HttpLink , InMemoryCache} from 'apollo-boost'
import gql from 'graphql-tag'

const endPointUrl = 'http://localhost:9000/graphql'
const client  = new ApolloClient({
 link: new HttpLink({uri:endPointUrl}),
 cache:new InMemoryCache()
});


async function loadStudentsAsync() {
    const query=gql`
    {
        students{
          id
          firstName
          lastName
          college{
            name
          }
        }
    }
    `
   const {data} = await client.query({query}) ;
   return data.students;
}

class  App  extends Component {
    constructor(props) {
        super(props);
        this.state ={
            students:[]
        }
        this.studentTemplate= [];
    }

   async loadStudents(){

        const studentData =  await loadStudentsAsync();

        this.setState({
            students: studentData
        })
         console.log("loadStudents")
    }
    render()
    {
        return(
            <div>
               <input type="button"  value="loadStudents" onClick={this.loadStudents.bind(this)}/>
                <div>
                    <br/>
                    <hr/>
                    <table border="3">
                    <thead>
                       <tr>
                           <td>First Name</td>
                           <td>Last Name</td>
                           <td>college Name</td>
                      </tr>
                    </thead>
                    <tbody>
                       { this.state.students.map(s=>{
                          return (
                               <tr key={s.id}>
                               <td>
                               {s.firstName}
                               </td>
                               <td>
                               {s.lastName}
                               </td>
                               <td>
                               {s.college.name}
                               </td>
                               </tr>
                          )
                      })}
                     </tbody>
                      </table>
                    </div>
            </div>
        )
    }

}

ReactDOM.render(<App/>, document.getElementById('root'));


```

The react application will load students from GraphQL server once we click on loadStudents button as shown below

![1_loadstudents](https://user-images.githubusercontent.com/9062443/44627918-45e85080-a954-11e8-89b0-1217dfbb1861.png)


<div style="page-break-after: always;"></div>


# Authentication

Authentication is the process or action of verifying the identity of a user or process. It is important that an application authenticates a user to ensure that the data is not available to an anonymous user.In this section we will learn how to authenticate a GraphQL client.
  
## Express JWT

In this example, we will use jQuery to create a client application. In order to authenticate requests, we will use `express-jwt` module on the server-side.  
The `express-jwt` module is a middleware that lets you authenticate HTTP requests using JWT tokens.JSON Web Token (JWT) is a long string that identifies the logged in user.Once the user logs in successfully , the server generates a JWT token. This token distinctly identifies a logged. In other words, the token is a representation of the user's identity.So next time the client comes to the server it has to present this token, to get the needed resources. The client can be a mobile application or a web application.

![authentication](https://user-images.githubusercontent.com/9062443/45263854-5d910000-b44f-11e8-834a-942389a0b2a9.jpg)

## Illustration

## Setting up the Server

### Step 1 : Download and Install required dependencies for the project

- Create a folder **auth-server-app**.Change your directory to **auth-server-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.

### Step 2: Create a schema

Add schema.graphql file in the project folder **auth-server-app** and add the following code  

```javascript

type Query
{
       greetingWithAuth:String
}

```

### Step 3: Add Resolvers  

Create a file resolvers.js in the project folder and add the following code . The resolver will verify if an authenticated user object is available in the context object of GraphQL. It will raise an exception if an authenticated  user is not available.

```javascript

const db = require('./db')

const Query = {
    greetingWithAuth:(root,args,context,info)=>{

//check if the context.user is null
        if (!context.user) {
            throw new Error('Unauthorized');
          }
        return "Hello from TutorialsPoint, welcome back : "+context.user.firstName;
    }
}

module.exports = {Query}

```

### Step 4: Create Server.js file

The authentication middleware authenticates callers using a JSON Web Token.The url for authentication will be `http://localhost:9000/login`.This will be a post operation and user will have to submit his email and password . It will be validated from the backend, if valid a token is generated using `jwt.sign` method, so for subsequent requests client will have to send this in header.If the token is valid, `req.user` will be set with the JSON object decoded to be used by later middleware for authorization and access control.

The following code uses two modules `jsonwebtoken` and `express-jwt` to authenticate requests .

- When the user clicks on the **greet** button,a request for the /graphql route is issued. If the user is not authenticated, he will be  prompted to authenticate himself.
- The user is presented with a form that accepts email id and password.In our example, the /login route is responsible for authenticating the user.
- The /login route verifies if a match is found in the database for credentials provided by the user.
- If the credentials are invalid,an HTTP 401 exception is returned to the user.
- If the credentials are valid,a token is generated by the server. This token is sent as a part of the response to the user. This is done by the `jwt.sign` function.

```javascript
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
//private key
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
  
app.post('/login', (req, res) => {
  const {email, password} = req.body;
  //check database
  const user = db.students.list().find((user) =>  user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  //generate a token based on private key , token doesn't have an expiry
  const token = jwt.sign({sub: user.id}, jwtSecret);
  res.send({token});
});



```

- For every request,the `app.use()` function will be called.This in turn will invoke the expressJWT middleware. This middleware will decode the JSON Web Token. User id stored in the token will be retrieved and stored as a property `user` in the request object.

```javascript
//decodes the JWT and stores in request object
app.use(expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}));


```

- To make available,the user property within GraphQL context,this property is assigned to the **context** object as shown below.

```javascript
//Make req.user available to GraphQL context
app.use('/graphql', graphqlExpress((req) => ({
  schema,
  context: {user: req.user && db.students.get(req.user.sub)}
})));


```

Create **server.js** in current folder path . The complete server.js file is as follows

```javascript
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt'); //auth
const jwt = require('jsonwebtoken'); //auth
const db = require('./db');

var port = process.env.PORT || 9000
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
const app = express();


const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
const resolvers = require('./resolvers')
const {makeExecutableSchema}=require('graphql-tools')



const schema = makeExecutableSchema({typeDefs , resolvers})


app.use(cors(), bodyParser.json(), expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}));


const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express')

app.use('/graphql', graphqlExpress((req) => ({
  schema,
  context: {user: req.user && db.students.get(req.user.sub)}
})));
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))


//authenticate students
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  const user = db.students.list().find((user) =>  user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({sub: user.id}, jwtSecret);
  res.send({token});
});

app.listen(port, () => console.info(`Server started on port ${port}`));

```

### Step 5: Run the application  

- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a  client to test the application.Open browser and type the url `http://localhost:9000/graphiql` Type the following query in the editor.  

```javascript
{
  greetingWithAuth
}

```

The response is as shown below , since we have not authenticated we will get error.

```javascript
{
  "data": {
    "greetingWithAuth": null
  },
  "errors": [
    {
      "message": "Unauthorized",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "greetingWithAuth"
      ]
    }
  ]
}
```

 Lets create a client application to authenticate

## Setting up the Jquery client

- In the client application a greet button is provided which will invoke the schema `greetingWithAuth` , if you click the button without login , it will give you the error message as below .

![jQuery clientUI](https://user-images.githubusercontent.com/9062443/44637227-a5367700-a9cd-11e8-91eb-79ff28e0673d.png)  

- Once you login with a user available in database the following screen will appear  

![3_jquery_app](https://user-images.githubusercontent.com/9062443/44637611-d3b55180-a9cf-11e8-964c-518015d0c117.png)  

So for accessing greeting we need to first access `http://localhost:9000/login` route as below , the response will contain the token generated from server.  

```javascript

 $.ajax({
            url:"http://localhost:9000/login",
            contentType:"application/json",
            type:"POST",
            data:JSON.stringify({email,password}),
            success:function(response){
                loginToken = response.token;
                $('#authStatus')
                .html("authenticated successfully")
                .css({"color":"green",'font-weight':'bold'});
              $("#greetingDiv").html('').css({'color':''});
            },
            error:(xhr,err)=> alert('error')
        })


```

- After login successfully we can access `greetingWithAuth` schema as given  below , there should be a `Authorization` header for all subsequent request with `bearer` token.

```javascript

  {  url: "http://localhost:9000/graphql",
        contentType: "application/json",
        headers: {"Authorization": 'bearer '+loginToken},  type:'POST',
        data: JSON.stringify({
         query:`{greetingWithAuth}`
  }

```

Following is index.html

```javascript

 <!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
$(document).ready(function(){
    let loginToken="";

   $("#btnGreet").click(function(){

        $.ajax({url: "http://localhost:9000/graphql",
        contentType: "application/json",
        headers: {"Authorization": 'bearer '+loginToken},
       type:'POST',
        data: JSON.stringify({
      query:`{greetingWithAuth}` }),
        success: function(result){
            $("#greetingDiv").html("<h1>"+result.data.greetingWithAuth+"</h1>")
        },
        error:function(jQxhr,error){
          if(jQxhr.status==401){
              $("#greetingDiv").html('please authenticate first!!')
              .css({"color":"red",'font-weight':'bold'})
              return;
          }

          $("#greetingDiv").html('error').css("color","red");


        }
    });
    });
    $('#btnAuthenticate').click(function(){
        var email = $("#txtEmail").val();
        var password = $("#txtPwd").val();

        if(email && password) {

        $.ajax({
            url:"http://localhost:9000/login",
            contentType:"application/json",
            type:"POST",
            data:JSON.stringify({email,password}),
            success:function(response){
                loginToken = response.token;
                $('#authStatus')
                .html("authenticated successfully")
                .css({"color":"green",'font-weight':'bold'});
              $("#greetingDiv").html('').css({'color':''});
            },
            error:(xhr,err)=> alert('error')
        })
    }else alert("email and pwd empty")


    })

});
</script>
</head>
<body>
        <h1> GraphQL Authentication </h1>

<hr/>
        <section>
                    <button id="btnGreet">Greet</button>
                    <br/> <br/>
                    <div id="greetingDiv">
                  </div>

        </section>
        <br/> <br/> <br/>
        <hr/>

        <section id="LoginSection">
            <header>
                <h2>*Login first to  access greeting </h2>
            </header>
            <input type="text" value="mohtashim@tutorial.com" placeholder="enter email" id="txtEmail"/>
            <br/>
           <input type="password" value="pass@123" placeholder="enter password" id="txtPwd"/>

            <br/>

            <input type="button" id="btnAuthenticate"  value="Login"/>
            <p id="authStatus"></p>

      </section>
</body>
</html>
```


<div style="page-break-after: always;"></div>

# Caching

Caching is the process of storing data in a temporary storage area called *cache*. When you return to a page you've recently visited, the browser can get those files from the cache rather than the original server. This saves your time and the network from the burden of additional traffic.  

Client applications interacting with GraphQL are responsible for caching data at their end.One possible pattern for this is reserving a field, like `id`, to be a globally unique identifier.  

## InMemory Cache

 InMemoryCache is a normalized data store commonly used in GraphQL client applications without use of other library like Redux.

  The sample code to use InMemoryCache with ApolloClient is given below.

 ```javascript

  import {ApolloClient ,HttpLink , InMemoryCache} from 'apollo-boost'
  const cache = new InMemoryCache();

  const client = new ApolloClient({
      link: new HttpLink(),
      cache
    });

 ```

 The InMemoryCache constructor takes an optional config object with properties to customize your cache

|Sr No |  parameter              |Description
|:----:|:--------------------------|:----------
| 1    | addTypename   | A boolean to determine whether to add __typename to the document (default: true)
| 2    | dataIdFromObject     | A function that takes a data object and returns a unique identifier to be used when normalizing the data in the store
| 3  | fragmentMatcher  | By default, the InMemoryCache uses a heuristic fragment matcher
| 4 | cacheRedirects | A map of functions to redirect a query to another entry in the cache before a request takes place.

## Illustration

We will create a single page application in ReactJS with two tabs one for the home tab and another for students.The students tab will load data from a GraphQL server API. The application will query for students data when the user navigates from the home tab to the students tab. The resulting data will be cached by the application.  

 We will also query the server time using `getTime` field to verify if the page is cached.If data is returned from the cache,the page will display the time of the very first request sent to the server. If the data is a result of a fresh request made to the sever, it will always show the latest time from server.

## Setting up the server

## Step 1 : Download and Install required dependencies for the project

- Create a folder **cache-server-app**.Change your directory to **cache-server-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.

## Step 2: Create a schema

Add schema.graphql file in the project folder cache-server-app and add the following code

```javascript
 type Query {
  
    students:[Student]
    getTime:String
}

type Student {
    id:ID!
    firstName:String
    lastName:String
    fullName:String
    }


 ```

## Step 3: Add Resolvers

Create a file resolvers.js in the project folder and add the following code-

 ```javascript

const db = require('./db')

const Query = {
    students:()=>db.students.list(),
     getTime:()=>{
        const today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        return `${h}:${m}:${s}`;
    }
}

module.exports = {Query}
 ```

## Step 4: Run the application

- Create a server.js file.Refer step 8 in the Environment Setup Chapter

- Execute the command npm start in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client   to test the application.
 Open browser and type the url `http://localhost:9000/graphiql` Type the following query in the editor.

```javascript

  {
    getTime
            students {
                id
              firstName
          }
  }
 ```

sample response shows the students and the server time.

```javascript
{
  "data": {
    "getTime": "22:18:42",
    "students": [
      {
        "id": "S1001",
        "firstName": "Mohtashim"
      },
      {
        "id": "S1002",
        "firstName": "Kannan"
      },
      {
        "id": "S1003",
        "firstName": "Kiran"
      }
    ]
  }
}
```

## Setting up the ReactJS Client  

Open a new terminal for client . The server terminal should be kept running before executing the client application. React application will be running on port number 3000 and server application on port number 9000.  

### Step 1: Create a react application

In the client terminal type the following command

`npx create-react-app hello-world-client`

- This will install everything needed for a typical react application. The npx utility and create-react-app tool creates a project with name hello-world-client.Once the installation is completed open the project in VSCode.  

- Install router modules for react using following command
 `npm install react-router-dom`

### Step 2 :Start hello-world-client  

Change the current folder path in the terminal to hello-world-client. Type `npm start` to launch the project.This will run a development server at port 3000 and will automatically open the browser and load the index page
This is shown in the screenshot given below:  

![client](https://user-images.githubusercontent.com/9062443/45262323-58718800-b432-11e8-89d9-daf6ed707f98.png)  

### Step 3 :Install apollo client libraries

To install an apollo client open a new terminal and be in current project folder path .Type following command.  

```javascript
npm install apollo-boost graphql

```

This will download the graphql libraries for client side and also the apollo boost package.We can cross verify this by typing `npm view apollo-boost dependencies`.This will have many dependencies as shown below-  

```javascript
{ 'apollo-cache': '^1.1.15',
  'apollo-cache-inmemory': '^1.2.8',
  'apollo-client': '^2.4.0',
  'apollo-link': '^1.0.6',
  'apollo-link-error': '^1.0.3',
  'apollo-link-http': '^1.3.1',
  'apollo-link-state': '^0.4.0',
  'graphql-tag': '^2.4.2' }
```

We can clearly see that apollo-client library installed.

### Step 4 : Modify the App Component in index.js file

For simplicity of react application you only need to keep the index.js in src folder and index.html in public folder all other files auto generated can be removed . Directory structure is given below.

```javascript
hello-world-client /

      -->node_modules
      -->public
           index.html
       -->src
           index.js
           students.js
      -->package.json

```

Add additional file students.js which will contain Students Component . Student details are fetched through the Student Component. In the App Component we are using a HashRouter.

Following is the **index.js** in react application.

```javascript
import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route , Link} from 'react-router-dom'
//components
import Students from './students'

class App extends Component {
    render(){
        return(
            <div><h1>Home !!</h1>
             <h2>Welcome to React Application !! </h2>
            </div>
        )
    }
}

function getTime(){
    var d =new Date();
    return d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
}

const routes = <HashRouter>
             <div>
                <h4>Time from react app:{getTime()}</h4>
                 <header>
                <h1>  <Link to="/">Home</Link>&ensp;
                  <Link to="/students">Students</Link>&ensp; </h1>
                </header>
                    <Route exact path="/students" component={Students}></Route>
                    <Route exact path="/" component={App}></Route>
              </div>

              </HashRouter>

ReactDOM.render(routes, document.querySelector("#root"))

```

### Step 5: Edit Component Students in Students.js

 In Students Component we will use two approaches to load data .
  1. Fetch API (loadStudents_noCache) - This will trigger a new request everytime the clicks the student tab.
  2. Apollo Client (loadWithApolloclient)- This will fetch data from the cache.

  Add a function `loadWithApolloclient` which query for students and  time from server .This function will enable caching.Here we use a gql function to parse the query .

  ```javascript
    async loadWithApolloclient(){
         const query =gql`{
            getTime
            students {
                id
              firstName
            }
          }`;

        const {data} = await  client.query({query})
        return data;

    }

  ````

 The Fetch API is a simple interface for fetching resources. Fetch makes it easier to make web requests and handle responses than with the older XMLHttpRequest.
  Following method shows loading data directly using fetch api.

 ```graphql

  async  loadStudents_noCache(){
        const response=await fetch('http://localhost:9000/graphql', {
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify({query:`{
            getTime
            students {
                id
              firstName
            }
          }`})
        })

        const rsponseBody= await response.json();
        return rsponseBody.data;
    }


 ```

In the constructor of StudentsComponent call the loadWithApolloClient method.
The complete **Student.js** file is below

```graphql


import React ,{Component} from 'react';
import { Link} from 'react-router-dom'

  
//Apollo Client
import {ApolloClient , HttpLink , InMemoryCache} from 'apollo-boost'
import gql from 'graphql-tag'
const client = new ApolloClient({
    link: new HttpLink({uri:`http://localhost:9000/graphql`}),
    cache:new InMemoryCache()

})


class Students extends Component {

    constructor(props){
        super(props);
        this.state={
            students:[{id:1,firstName:'test'}],
            serverTime:''
        }
        this.loadWithApolloclient().then(data=>{
            this.setState({
                students:data.students,
                serverTime:data.getTime
            })
        })
    }

     async  loadStudents_noCache(){
        const response=await fetch('http://localhost:9000/graphql', {
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify({query:`{
            getTime
            students {
                id
              firstName
            }
          }`})
        })

        const rsponseBody= await response.json();
        return rsponseBody.data;
    }

    async loadWithApolloclient(){
        console.log("inside apollo client function")
         const query =gql`{
            getTime
            students {
                id
              firstName
            }
          }`;

        const {data} = await  client.query({query})
        return data;

    }

      render(){

        return(
            <div>
              <h3>Time from GraphQL server :{this.state.serverTime}</h3>
               <p>Following Students Found </p>
               <div>
                   <ul>
               {
                 this.state.students.map(s=>{
                    return(
                    <li key={s.id}>
                   {s.firstName}
                     </li>
                    )
                 })
               }
               </ul>
               </div>

            </div>
        )
    }
}


export default Students


````

### Step 6: Run the react application with npm start

 You can test the react application from  by switching from home tab to students tab. Once the students tab is loaded with data from server.It will cache the data.You can test it by switching from home and students multiple times. The output will be as shown below.

 ![2_caching_stduents](https://user-images.githubusercontent.com/9062443/45249007-5aeeb780-b336-11e8-8f1d-37586b7b2266.png)

 If you have loaded the students page first by typing url `http://localhost:3000/#/students` you can see the react app loaded time and GraphQL load time would be approximately same . After that
 if you switch to home view and return back the GraphQL server time will not change. This shows the data is cached.

### Step 7: Change loadWithApolloclient call to loadStudents_noCache

 If you change the load method to loadStudents_noCache in constructor of StudentComponent,
 the output will not cache the data. This way you can see the difference between caching and non caching.

```javascript

this.loadStudents_noCache().then(data=>{
            this.setState({
                students:data.students,
                serverTime:data.getTime
            })
        })


```

![1_no_caching_student](https://user-images.githubusercontent.com/9062443/45249057-24656c80-b337-11e8-986b-2e4e15e1c6c0.png)

From the above output you can see if you switch back and forth between tabs the time from graphql server will always be latest . That means it is not caching data.


<div style="page-break-after: always;"></div>

