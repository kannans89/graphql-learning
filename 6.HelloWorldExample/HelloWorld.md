  
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