
# React Integration

React is a Javascript library for building user interfaces.This chapter explains how one can integrate GraphQL with a React application.  

The quickest way to set up a react project is by using  the *Create React App* tool. Follow the steps given below-

## Setting up the Server

### Step 1 : Download and Install required dependencies for the project

- Create a folder **react-server-app**.Change your directory to **react-server-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.  

### Step 2: Create a schema

Add schema.graphql file in the project folder **react-server-app** and add the following code  

```javascript

type Query
{
    greeting: String
   sayHello(name:String!):String
}

```

The file has defined two queries `greeting` and `sayHello`. The `sayHello` query accepts a string parameter returns another string.The parameter to the `sayHello()` function is not null.

### Step 3 : Create Resolvers

Create a file resolvers.js in the project folder and add the following code-

```javascript
const Query =
{
   greeting: () => 'Hello GraphQL  From TutorialsPoint !!' ,
   sayHello:(root,args,context,info)=> `Hi ${args.name} GraphQL server says Hello to you!!`

}

module.exports = {Query}

```

Here `greeting` and `sayHello` are two resolvers .In the`sayHello` resolver the value passed to the name parameter can be accessed through `args`.To access resolver functions outside the module Query object has to be exported using `module.exports`.  

### Step 4: Run the application  

- Create a server.js file.Refer step 8 in the Environment Setup Chapter.

- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a       client to test the application.
- Open browser and type the url `http://localhost:9000/graphiql` .Type the following query in the editor.  

```javascript
{
   greeting,
   sayHello(name:"Mohtashim")
}

```

The response from server is as given below-

```javascript

{
  "data": {
    "greeting": "Hello GraphQL  From TutorialsPoint !!",
    "sayHello": "Hi Mohtashim GraphQL server says Hello to you!!"
  }
}

```

## Setting up the Client

Open a new terminal for client . The server terminal should be
kep running before executing client application. React application will be running in port no 3000 and server application on port no 9000.

### Step 1: Create a react project hello-world-client

In the client termianl type the following command .  

`npx create-react-app hello-world-client`  

This will install everything needed for a typical react application. The **npx** utility and **create-react-app** tool creates a  project with name hello-world-client.Once the installation is completed open the project in VSCode.

### Step 2 :Start hello-world-client

Change the current folder path from terminal to hello-world-client and type `npm start` to launch the project.This will run a development server at port 3000 and will automatically open the browser and load the index page

This is shown in the screenshot given below:
![1_react_launch](https://user-images.githubusercontent.com/9062443/45262323-58718800-b432-11e8-89d9-daf6ed707f98.png)

### Step 3 : Modify the App Component

 In the App.js inside src folder add two functions - one to load greeting message and another to load sayHello message.

Following is `loadGreeting` function which sends  GraphQL query for greeting.

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

Following is `loadSayhello` function which sends  GraphQL query for `sayHello`.

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

 Once both applications are running click on the greet button you will see the following output.After that enter a name on the following textbox and click on sayHello button. Output will be as below.

![react-ouput](https://user-images.githubusercontent.com/9062443/44403682-b6692900-a572-11e8-883b-1c8d50eada16.png)
