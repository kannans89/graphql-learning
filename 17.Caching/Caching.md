# Caching

The graphql client applications have to handle caching on their end.One possible pattern for this is reserving a field, like `id`, to be a globally unique identifier. The sample schema of students and their college details  uses this approach:

```javascript
/* Query*/
 {
  students{
    id
    firstName
    lastName
    college{
      id
      name
    }
  }
}

```

A sample response from server for the above query.

```javascript
/* Response */
{
  "data": {
    "students": [
      {
        "id": "S1001",
        "firstName": "Mohtashim",
        "lastName": "Mohammad",
        "college": {
          "id": "col-102",
          "name": "CUSAT"
        }
      },
      {
        "id": "S1002",
        "firstName": "Kannan",
        "lastName": "Sudhakaran",
        "college": {
          "id": "col-101",
          "name": "AMU"
        }
      },
      {
        "id": "S1003",
        "firstName": "Kiran",
        "lastName": "Panigrahi",
        "college": {
          "id": "col-101",
          "name": "AMU"
        }
      }
    ]
  }
}


```

This is a powerful tool for  GraphQL client side developers. In the same way that the URLs of a REST based API provided a globally unique key, the `id` field in this system provides a globally unique key.

## InMemory Cache

 InMemoryCache is a normalized data store that supports all of Apollo Client  features without the dependency on third party javascript library like Redux. In some instances, you may need to manipulate the cache directly, such as updating the store after a mutation.

 To install InMemory cache  into reactjs application we can install apollo-boost package.

 ```javascript
   npm install apollo-boost
 ```

 The apollo-boost package comes with apollo client and the caching library . The sample code to use InMemoryCache with ApolloClient is given below.

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

 We will create a single page application in reactjs with two tabs one for home tab and second students.The students tab will load data from a GraphQL server API which we will be setting up.  
 If we surf from home tab to students tab , react app will query for students data as shown below

 ```javascript
  {
            getTime
            students {
                id
              firstName
            }
          }

 ```

The resulting data if not cached , every time we move from home to students  tab it will make a new request to the API .To track if the page is cached we will also query the server time using `getTime` field.If the page is cached it will show the very first requested time from server other wise it will always show latest time from server.

## Setup GraphQL Server

 ### Step 1: Edit Schema.graphql

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

### Step 2: Edit Resolver.js

 ```javascript

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

 ``` 
 
### Step 3: Run and Test using GraphiQL

## Setup ReactJs Client

### Step 1: Create client application using crateReactApp utility

### Step 2: Install apollo boost

### Step 3: Create Component Students

  Add a function which query for students , time form server
Here we use a gql function to parse the query .

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

In the construcotr of StudentsComponent call the loadWithApolloClient method. The complete Student.js file is
below

```javascript


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

The app component is given below . This  code placed in index.js file

```javascript

import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route , Link} from 'react-router-dom'




//components

 import Students from './components/students'
 


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

### Step 4: Run the react application with npm start

 You can test the react application from  by switching from home tab to students tab. Once the students tab is loaded with data from server.It will cache the data.You can test it by switching from home and students multiple times. The output will be as shown below.

 ![2_caching_stduents](https://user-images.githubusercontent.com/9062443/45249007-5aeeb780-b336-11e8-8f1d-37586b7b2266.png)

 If you have loaded the students page first by typing url `http://localhost:3000/#/students` you can see the react app loaded time and GraphQL load time would be approximately same . After that
 if you swtich to home view and return back the GraphQL server time will not change. This shows the data is cached.

### Step 5: Change loadWithApolloclient call to loadStudents_noCache

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