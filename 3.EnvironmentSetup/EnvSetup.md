
# Environment Setup

To execute the examples in this tutorial you will need-

- A computer running Linux, macOS, or Windows.
- A web browser, preferably the latest version of Google Chrome.
- A recent version of Node.js installed. The latest LTS version is recommended. Refer the **Installation** section in this tutorial [Installing NodeJs](https://www.tutorialspoint.com/nodejs/nodejs_environment_setup.htm).  
- Visual Studio Code with extension *GraphQL for VSCode* installed or any code editor of your choice

## Build a GraphQL server with NodeJS

### Step 1 : Verify Node and NPM versions
  
  After installing NodeJS , verify the version of node and npm using following commands on the terminal

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
    "notarealdb": "0.2.2"
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

### Step 4 : Create flat file database

This tutorial will be using flat files to store and retrieve data.Create two files **students.json** and **colleges.json** . Following will be the contents of the files. These database files will be used in illustrations explained in the subsequent chapters.

- Following is the colleges.json file

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

- Following is the students.json file

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

- Create file **db.js** this will be our datastore

```javascript

const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
  students:store.collection('students'),
  colleges:store.collection('colleges')
};

```

## Step 6: Create a schema file schema.graphql

Create a schema file  and add following contents. 

```javascript
  type Query  {
    test: String
}  

```

## Step 7: Create a resolver file resolvers.js

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

- Verify the folder structure of project test-app

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

- Execute the command `npm start`.

```javascript
    C:\Users\Admin\test-app>npm start  
```

- The server will be up and running on port 9000 so we can test the application using GraphiQL tool . Open browser and type the url `http://localhost:9000/graphiql` . Type the following query in the editor.

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

 **Note**:We will modify the schema.graphql and resolvers.js files for illustrations discussed in the subsequent chapters
 **Note**: Please ensure apollo server version 1.0 is used
