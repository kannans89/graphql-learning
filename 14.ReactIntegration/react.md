
# React Integration

The quickest way to set up a react project is by using *Create React App* tool.Create a client folder and change the terminal path to this folder and fire the following command.

`npx create-react-app hello-world-client`

This will install everything needed for a typical react application,here using npx utility and create-react-app tool a project with name hello-world-client is created.Once installation is completed open the project in VSCode.

Type `npm start` launch the project.This will run a development server at port 3000 and will automatically open the browser and load the index page.

In the App.js inside src folder let us add two functions one to load greeting message and another to load sayHello message. This is our graphql schema

```javascript
 type Query  {
    greeting: String
    sayHello(name:String!):String
}

```

Following is the package.json of graphql server app

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

Following is the server.js file

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
    sayHello(name:String!):String
}`

const  resolverObject = {
   Query : {
       greeting: () => 'Hello GraphQL  From TutorialsPoint !!' ,
       sayHello:(root,args,context,info)=> `Hi ${args.name} GraphQL server says Hello to you!!`


   }
}
const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs:typeDefinition , resolvers:resolverObject})
const {graphqlExpress,graphiqlExpress} = require('apollo-server-express')
app.use('/graphql',graphqlExpress({schema}))
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))
app.listen(port , ()=> console.log(`server is up and running ${port}`))


```

## React Client App Changes

Now let us start the client side development using react, first we need to add function to fetch greeting data in App.js

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

we also need another function to get sayHello function details.Note we are using async await features of javascript ,  fetch api to make ajax calls

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

The react app will be running on port 3000 and graphql server will be running on port 9000. Once both applications are running click on the greet button you will see the following output.After that enter a name on the following textbox and click on sayHello button.
Output will be as below.

![react-ouput](https://user-images.githubusercontent.com/9062443/44403682-b6692900-a572-11e8-883b-1c8d50eada16.png)