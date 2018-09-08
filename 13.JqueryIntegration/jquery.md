
# JQuery Integration

JQuery is a javascript library that helps to make asynchronous requests to the server and update data 

Suppose,a web application needs to load data from a GraphQL server.  

To integrate GraphQL with JQuery first let us inspect the graphiql request headers and understand the request parameters.

Start the hello-world app (refer chapter for illustration) and type the  graphql query `{greeting}` in graphiQL window . Right click and inspect or (ctrl+shift+I) on chrome , go to the network tab as shown below

![1_request_header](https://user-images.githubusercontent.com/9062443/44342005-4f327280-a4a7-11e8-87ff-8afd3bf3547e.png)

From the simple hello world example we can understand that the http method used is **POST** .Now int the browser scroll down the header section to view the *request payload* ,once you click on view code you will see following in request payload section of chrome .Also note the request url endpoint `http://localhost:9000/graphql` to be called from client application.

```javascript
  {"query":"{\n  greeting\n}","variables":null,"operationName":null}

```

Following is the server.js code , here we are using two queries one is `greeting` and second is  `sayHello` which takes in a parameter as string and returns another string.The parameter to sayHello function is not null.

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

following is the package.json

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

sample request from grpahiql is given below

```javascript
{
  greeting,
  sayHello(name:"Mohtashim")
}

```

response from server

```javascript
{
  "data": {
    "greeting": "Hello GraphQL  From TutorialsPoint !!",
    "sayHello": "Hi Mohtashim GraphQL server says Hello to you!!"
  }
}

```

We will create a client application in jquery and invoke both the methods.
Following is the html page **index.html** for jquery integration.

```javascript
<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
$(document).ready(function(){

    $("#btnSayhello").click(function(){

       const name = $("#txtName").val();
       console.log(name);
       $("#SayhelloDiv").html('loading....');

       $.ajax({url: "http://localhost:9000/graphql",

        contentType: "application/json",type:'POST',
    data: JSON.stringify({ query:`{
                    sayHello(name:"${name}")
              }`
}),
        success: function(result){
            console.log(JSON.stringify(result))
            $("#SayhelloDiv").html("<h1>"+result.data.sayHello +"</h1>");
        }});


    });


    $("#btnGreet").click(function(){

         $("#greetingDiv").html('loading....');
         //https://kannan-first-graphql-app.herokuapp.com/graphql
        $.ajax({url: "http://localhost:9000/graphql",

        contentType: "application/json",
type:'POST',
        data: JSON.stringify({
query:`{greeting}`
}),
        success: function(result){
            $("#greetingDiv").html("<h1>"+result.data.greeting+"</h1>");
        }});
    });
});
</script>
</head>
<body>
        <h1>Jquery Client </h1>

<hr/>
        <section>
                    <button id="btnGreet">Greet</button>
                    <br/> <br/>
                    <div id="greetingDiv">
                  </div>


        </section>
        <br/> <br/> <br/>
        <hr/>

        <section>
             Enter a name:<input id="txtName" type="text" value="kannan"/>
                <button id="btnSayhello">SayHello</button>
                <div id="SayhelloDiv">
              </div>


    </section>


</body>
</html>

```

open this file in browser and click on the button to see the response.Ouput will look as below
![2_jquery_output](https://user-images.githubusercontent.com/9062443/44388206-2791e780-a545-11e8-9df6-20fc55625ac7.png)
