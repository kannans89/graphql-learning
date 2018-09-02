
# Environment Setup

To execute the examples in this tutorial you will need-

- A computer running Linux, macOS, or Windows.
- A web browser, preferably the latest version of Google Chrome.
- A recent version of Node.js installed. The latest LTS version is recommended
- Visual Studio Code with extension *GraphQL for VSCode* installed or any code editor of your choice

## How to Build a GraphQL server with nodejs

 Step 1 : Verify Node and Npm versions
  
  After Installing nodejs , verify the version of node and npm using following commands on the terminal

```javascript
C:\Users\Admin>node -v
v8.11.3

C:\Users\Admin>npm -v
5.6.0

```

Step 2: Create a project folder and open in VSCode

The root folder of project can be named *test-app* and open the folder using visual studio code editor by following the instructions.

```javascript

C:\Users\Admin>mkdir test-app
C:\Users\Admin>cd test-app
C:\Users\Admin\test-app>code .

```

Step 3: Create  **package.json** and install the dependencies .

Create a package.json file which will contain all the dependencies of the GraphQL server application.

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

Install the dependencies by using the command as given

```javascript
C:\Users\Admin\test-app>npm install
```

Step 4: Create **Server.js** and Configure GraphQL

```javascript

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const port = process.env.PORT ||9000
const app = express()
app.use(bodyParser.json() , cors())

const typeDefinition = `
type Query  {
    test: String
}`

const  resolverObject = {
   Query : {
       test: () => 'Test Success , GraphQL server is up & running !!'
   }
}
const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs:typeDefinition , resolvers:resolverObject})
const {graphqlExpress,graphiqlExpress} = require('apollo-server-express')
app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))
app.listen(port , ()=> console.log(`server is up and running ${port}`))

```

After editing the **server.js** we need to execute the server.js file by running the command `npm start`.

```javascript
    C:\Users\Admin\test-app>npm start  

    > nodemon --ignore data/ server.js
[nodemon] 1.17.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node server.js`
server is up and running 9000
```

The server is running in 9000 port so we can test the application using GraphiQL tool . Open browser and type the url `http://localhost:9000/graphiql` . Type the following query in the editor.

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

 *note*: please ensure apollo server version 1.0 is used
