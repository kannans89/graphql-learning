  
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