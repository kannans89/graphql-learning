
# Home

GraphQL is an opensource server side technology developed by facebook to
optimise RESTful API calls. It is a  data query language as well as a runtime to execute it.It allows client applications to define the structure of the data required, and exactly the same structure of the data is returned from the server, therefore preventing excessively large amounts of data from being returned.This tutorial will teach you basic GraphQL queries and will also take you through integration with React and Jquery Applications

This tutorial has been prepared for the beginners to help them understand GraphQL. After completing this tutorial you will find yourself at a moderate level of expertise in using GraphQL in your web applications.

GraphQL development is based on JavaScript programming language so if you have basic understanding on JavaScript programming then it will be a fun to learn GraphQL
# Why GrpahQL

## Solves the problem of  RESTful Routing

   while making a custom end point like api/users/{userId}/firends_and_thier_company_job_vacancies ,this will break RESTful routing conventions.
   as it should be like api/users/{userId}/friends
                       api/user/{userId}/friends/{firendID}/company
  api/user/{userId}/friends/company/{companyId}/jobvacancies

## solves the problem of overserving of data

    list of all companies are returned by default it may return a JSON data which may contain so many details which is not needed .
    for example to retrieve company it will return a sample like

```javascript
var response = {  name:"Tutorials Point",
                  stock_ticker:"TSPT",
                  empCount:1000,
                  domain:"Education",
                  founded:2006,
                  type:"public"
                  founder:"Mohtashim"
              }
```

 But client application only wanted to display name of comapny and its founder but RESTful apis over serving data
solves heavily nested business object relation problem

When you use heavily nested business model to retieve data from server , client application have
to make multiple request to the server .

### Graph Relationship

GraphQL maintains a graph realtionship with all nested objects and uses a query language to walk through the graph data structure and retrieve data . A sample query to retrive a specific use with user id 1001 and display all his friends and comapny name would be like this.

```graphql
query {
  user(id:1001){
      friends {  name
                company{
                name
             }
         }
       }
  }
  ```

 Why GraphQL ?

     RESTful API's has been a standard for data communications between mobile devices and server side. REST makes the client applications depend on the server , that means client can only ask for things in the menu , just like on the menu of a restaurant.
     CustomEndpoints have to be made in REST if you need new item which is not in menu.
     Multiple requests have to be made to retrieve data from connected Business objects.
     So client round trips are increased.

    GraphQL was invented in an effort from Facebook to enhance mobile application development . Mobile applications require more complex and custom data fetching needs also they have to be made less dependent on the server.

Declarative Principle vs Imperative

  Suppose we want to display name and country of John's friends in facebook , a typical
  RESTful api call will be very similar to this

- api/users/smith  <!-- return details of smith-->
- api/friends/{userId}  <!-- returns friends name,countryId-->
- api/countries/{countryId}

using graphQL we can make more declarative call with single request
  query all friends name of 'smith' along with their country  name
   {
     user(name){
         friends{
             name,
             country{
                 name
             }
         }
     }
 }

Solves Over Fetching Problem
# Environment Setup

To follow the examples in this course you will need

- A computer running Linux, macOS, or Windows.
- A web browser, preferably the latest version of Google Chrome.
- A recent version of Node.js installed. The latest LTS version is recommended
- Visual Studio Code or any code editor of your choice

# How to Build a GraphQL server with nodejs

1. nodejs
2. express
3. apollo

First we need to setup a  graphQL server. For this we need to install

- express framework
- cors as initial phase.

what is CORS ?
   this is useful when the client application , which is react app calls the server

what is body-parser?
  graphql request are in json format , so we need a jsonparser
  
Install express and check the express server is running
**server.js**

```javascript

    const bodyParser = requier('body-parser')
    const cors = require('cors')
    const express = require('express')
    const port = 9000
    const app = express()
    app.use(cors() , bodyParser())
    app.listen(port, () => console.log('server running on port ${port}'));

```

what are the dependencies for graphql ?
  **graphql**
  contains the core graphql functionalities like parsing queries

 **graphql-tools**
   provides some utility functions

   **apollo-server-express@1**
    provides the glue for serving grahql over http on top of express

 *note*: make sure apollo server version 1.0 is used

# Architecture

 GraphQL itself is a specification . It is just a document which sepdicifes how a grpahql server has to behave . What kind of request it should accept what response the response format
 should like .[graphqlspecfication is here](https://facebook.github.io/graphql) .  
  Suppose yo want to use GrahQL in your project ,you can read the speccification and build it by yourself , in any programming language of your choice . There are reference implementation in nodejs platform.

## Architectural UseCases

- GraphQL Server with connected database.
- GraphQL server to integrate existing system.
- Hybrid approach with connected database and integration with existing legacy system

### GraphQL server with Connected Database

This is often used with new projects.Will be using single webserver that implements GraphQL.When Query reaches the server , it reads the request payload and fetches the data from the DB server and response is given to the client as per the format specified in the official specification.

shown is the architectural diagram of client communicating with a single graphql server over the web
![alt text](https://user-images.githubusercontent.com/9062443/43997767-c1475e72-9e02-11e8-911f-8892e1843d0e.png "GraphQL with Connected DB Architecture")

Another important concept of GraphQL is its transport layer agnostics . It can be used with any available network protocol like tcp , websocket or any other transport . It is also agnostics to database so you could use relational or nosql databases.

### GraphQL server integrating existing systems

It integrates multiple existing systems behind a single coherent GraphQL API .This is particularly helpful for companies which have legacy infrastructure .One of he challenges for legacy systems are integrating cutting edge technologies. GrahphQL unifies existing systems and hide complexity of data fetching logic . So it could fetch data from multiple RESTful webservices.

![2_legacy_systems](https://user-images.githubusercontent.com/9062443/43998570-01ff1e6a-9e16-11e8-96c5-0f703031b68e.png "GraphQL integrating existing systems")

### Hybrid Approach

Finally we can combine both the two approaches and build a GraphQL server that has connected database but still talks to legacy or third party systems.
In this architecture when request is received by the GraphQL server , the server will resolve the request , either will retrieve data from connected database or from the integrated API's .

![hybrid](https://user-images.githubusercontent.com/9062443/43998674-ae8900c2-9e18-11e8-8f30-7c5f26c1140a.png "hybrid architecture")

How does graphql can cope with both
environments ?

this is because of the concept of a resolver function.
# Application Components

This section we will discuss how the different components relate with each other and GraphQL building blocks. The entire application components can be divided into two.

|Sr No |  Description              |
|:----:|:--------------------------|
| 1    | Server Side Components    |
| 2    | client Side Components    |

## GraphQL Server  

  GraphQL server forms the core component on the server side .GraphQL server allows to parse the queries coming from graphql client applications. Apollo Server is most commonly used implementation of GraphlQL server specification. Other server programming components include the following.

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
# HelloWorld Example

Let us create a minimal graphQL server
and access it through client tool *graphiQL* . This will be based on nodejs,express,apollo server.This will be a simple API which will return a greeting.  

You will learn to put together all the concepts together .

step 1: create folder hello-world-server add a package.json , give a name to the package and make the package as private

```javascript
{
    "name":"hello-world-server",
    "private":true
}
```

open dos prompt and  change the directory to hello-world-server and install dependencies for express server

```javascript
npm install body-parser cors express
```

create a server.js file in the project folder and type  the following code.

```javascript

 const bodyParser = require('body-parser')
 const cors = require('cors')
 const express = require('express')
 const port = 9000
 const app = express()
 app.use(bodyParser.json() , cors())
 app.listen(port , ()=> console.log(`server is up and running at ${port}`))


```

now test the express server is running by checking

```javascript
 node server.js
```

in the server console you will see the following output.

```javascript
server is up and running at 9000
```

open the browser and type `http://localhost:9000` you will get the following screen.
!["express"](https://user-images.githubusercontent.com/9062443/44002340-a6ab8992-9e5e-11e8-8907-81ec94ad27df.png "express")

This shows that the express server is running on port 9000 . Lets stop the server pressing *ctr+c*
and start installing GraphQL libraries.

```javascript
npm install graphql graphql-tools apollo-server-express@1
```

After installation is successful you can verify all the dependencies using package.json

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

## Adding GraphQL functionality

Lets describe the data which we want to expose in the API . This
is possible by defining a type system .So we need to write some TypeDefinitions . For this we need to use a special syntax called
**GraphQL Schema Definition Language**

```javascript

  // Adding Type Definitions

  const typeDefinition = `
     type Query  {
         greeting: String
     }
  `
```

Next step is to add some code to process the request for greeting field, we do that in object called resolver. Structure of resolver function will match the Schema defined before.

```javascript

  // Adding resolver

  const  resolverObject = {
      Query : {
          greeting: () => 'Hello GraphQL  From TutorialsPoint !!'
      }
  }
```

|Sr.No | concept | description
|:-----|:--------|:-----------
|1    | schema | What the client can ask For
| 2   | resolver | Logic of how the  server will respond

Next is wire both together , for this we use some helper functions given by graphql tools.

```javascript
  const {makeExecutableSchema} = require('graphql-tools')
  const schema = makeExecutableSchema({typeDefs:typeDefinition , resolvers:resolverObject})

```

Now lets tell express to serve our graphql schema , this is by importing  graphqlExpress from apollo-server-express module.
Also we need to import the browser based tool **graphiQL** to test application

```javascript
  const {graphqlExpress , graphiqlExpress} = require('apollo-server-express')
    //lets create a route
   app.use('/graphql',graphqlExpress({schema}))
   app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))

```

The complete server.js code is given below

```javascript

 const bodyParser = require('body-parser')
 const cors = require('cors')
 const express = require('express')
 const port = 9000
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

Open the  browser and type `http://localhost:9000/graphiql`

!["graphiql"](https://user-images.githubusercontent.com/9062443/44010356-80865618-9ecf-11e8-8297-fe947766a200.png "graphql")