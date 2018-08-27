
# Apollo Client

 We have used Apollo Server to build graphql specification on server side.It is quick and easy to build production ready GraphQL server.Now lets look at client side.

Apollo Client is the best way to use GraphQL to build client applications. The client is designed to help developer quickly build a UI that fetches data with GraphQL, and can be used with any JavaScript front-end.

Apollo Client supports following platforms.

|Sr No |  Platform |  Framework
|:----:|:----------|:------------------
|  1 | Javascript  | React,Angular,Vue,Meteor,Ember
|  2 | WebComponents  | Polymer , lit-apollo
|  3 | Native Mobile  | Native Android with Java, Native iOS with Swift

One of the major feature of apollo client is caching. Apollo boost is a convenience package which brings in a bunch of other dependencies`npm install apollo-boost graphql` . This will download the graphql libraries for client side and also the apollo boost package.
we can cross verify this by typing `npm view apollo-boost dependencies`
this will have many dependencies as shown below

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

We will use apollo client in a sample react application . We can use apollo-boost to download all apollo client dependencies.

step 1: create a server app

step 2:Using create-react-app npm module let us create a client app
minimal amount of client code need is

```javascript

import {ApolloClient ,HttpLink , InMemoryCache} from 'apollo-boost'


const endPointUrl = 'http://localhost:9000/graphql'
const client  = new ApolloClient({
 link: new HttpLink({uri:endPointUrl}),
 cache:new InMemoryCache()
});

```

following is package.json

```javascript

{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "apollo-boost": "^0.1.14",
    "graphql": "^0.13.2",
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "react-scripts": "1.1.5"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}


```

with apollo client we can directly call server without the need of fetch api. Also the queries and mutations not necessarily be a string made with back tick notation.There is a `gql` function which will directly parse the queries without being written in string type.
so programmer can directly write queries very much the same way we type in GraphiQL tool.
`gql` is a tag function which will parse the template string written in back tick notation to graphql query object. The apollo client query method returns a promise.

Following is the index.js in react application.(For simplicity you only need to keep the index.js in src folder and index.html in pubic folder all other files can be removed)

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

![1_loadstudents](https://user-images.githubusercontent.com/9062443/44627918-45e85080-a954-11e8-89b0-1217dfbb1861.png)