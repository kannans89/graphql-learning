  
# HelloWorld Example

Let us create a minimal graphQL server
and access it through client tool **graphiQL** . This will be based on nodejs,express,apollo server.This will be a simple API which will return a greeting message.  

You will learn to put together all the concepts together .

## step 1: setting up express

ExpressJS is a web application framework that provides you with a simple API to build websites, web apps and back ends.For handling http requests efficiently we will  be building a GraphQL server on the top of express framework.

 create a folder **hello-world-server** add a **package.json** , give a name to the package . Since we are using this package internally lets make it private.

```javascript
{
    "name":"hello-world-server",
    "private":true
}
```

open terminal t and  change the directory to hello-world-server and install dependencies for express server

```javascript
C:\Users\Admin>mkdir hello-world-server
C:\Users\Admin>cd hello-world-server
C:\Users\Admin\hello-world-server>npm install express body-parser cors

```

*body-parser* is a middleware package which help express to handle http post request efficiently , *cors* is another middleware package for handling  cross-origin resource sharing efficiently.Both packages are helpful once we make a reactjs client application.

create a **server.js** file within the project folder and type the following in it.

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

now test the express server is running by checking

```javascript
 C:\Users\Admin\hello-world-server>node server.js
```

in the server console you will see the following output.

```javascript
server is up and running at 9000
```

open the browser and type `http://localhost:9000` you will get the following screen.
!["express"](https://user-images.githubusercontent.com/9062443/44002340-a6ab8992-9e5e-11e8-8907-81ec94ad27df.png "express")

This shows that the express server is running on port 9000 . Lets stop the server pressing *ctr+c*.

## Step 2: install graphql and apollo server

 Now express is configured , next step will be to download the dependencies of graphql which include graphql,graphql-tools and apollo-server-express@1 modules . As apollo server v1.0 is a stable release we will be using the same.Type the following commands to install this dependencies.

```javascript
 C:\Users\Admin\hello-world-server>npm install graphql graphql-tools apollo-server-express@1
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

## Step 3: create  schema

Lets describe the data which we want to expose in the GraphQL API . This
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

From the type definition we can understand the root query  contains a `greeting` attribute which will return a `string` value.

## Step 4: create  resolver

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

We need to tie both together , for this we use `makeExecutableSchema` helper function from graphql-tools module.

```javascript
  const {makeExecutableSchema} = require('graphql-tools')
  const schema = makeExecutableSchema({typeDefs:typeDefinition , resolvers:resolverObject})

```

Now lets tell express to serve our graphql schema , this is by importing  `graphqlExpress` function from apollo-server-express module. All GraphQL API's are tested using a browser based tool called **GraphiQL** . To support it we need to import `graphiqlExpress` function and register routes for graphql and graphiql as follows.

```javascript
  const {graphqlExpress , graphiqlExpress} = require('apollo-server-express')
    //create routes for graphql and graphiql
   app.use('/graphql',graphqlExpress({schema}))
   app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))

```

The complete server.js code is given below

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

## Step 5: start app

 Lets add nodemon as a development dependency to project . This help to restart the server automatically if we make any change in server.js file.

 ```javascript
 C:\Users\Admin\hello-world-server>npm install --save-dev nodemon

```

Add start command in the scripts section as shown below

```javascript

{
    "name": "hello-world-server",
    "private": true,
    "scripts": {
        "start": "nodemon --ignore data/ server.js"
      },
    "dependencies": {
        "apollo-server-express": "^1.4.0",
        "body-parser": "^1.18.3",
        "cors": "^2.8.4",
        "express": "^4.16.3",
        "graphql": "^0.13.2",
        "graphql-tools": "^3.1.1"
    },
    "devDependencies": {
        "nodemon": "1.17.1"
    }
}



```

Now start the server using `npm start`

```javascript
C:\Users\Admin\hello-world-server>npm start
```

This will execute the server.js file.Open the  browser and type `http://localhost:9000/graphiql`

In the query tab enter the given query

```javascript
  {
  greeting
  }

```

The response from the server is will be as below.

```javascript
  {
  "data": {
    "greeting": "Hello GraphQL  From TutorialsPoint !!"
  }
}


```

!["graphiql"](https://user-images.githubusercontent.com/9062443/44010356-80865618-9ecf-11e8-8297-fe947766a200.png "graphql")