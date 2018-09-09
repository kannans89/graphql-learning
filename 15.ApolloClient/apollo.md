
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
