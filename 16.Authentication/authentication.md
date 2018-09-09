
# Authentication

Authentication is the process or action of verifying the identity of a user or process. It is important that an application authenticates a user to ensure that the data is not available to an anonymous user.In this section we will learn how to authenticate a GraphQL client.
  
## Express JWT

In this example, we will use jQuery to create a client application. In order to authenticate requests, we will use `express-jwt` module on the server-side.  
The `express-jwt` module is a middleware that lets you authenticate HTTP requests using JWT tokens.JSON Web Token is a long string that identifies the logged in user.Once the user logs in successfully , the server generates a JWT token. This token distinctly identifies a logged. In other words, the token is a representation of the user's identity.So next time the client comes to the server it has to present this token, to get the needed resources. The client can be a mobile application or a web application.

![authentication](https://user-images.githubusercontent.com/9062443/45263854-5d910000-b44f-11e8-834a-942389a0b2a9.jpg)

## Illustration

## Setting up the Server

### Step 1 : Download and Install required dependencies for the project

- Create a folder **auth-server-app**.Change your directory to **auth-server-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.

### Step 2: Create a schema

Add schema.graphql file in the project folder **apollo-server-app** and add the following code  

```javascript

type Query
{
       greetingWithAuth:String
}

```

### Step 3: Add Resolvers  

Create a file resolvers.js in the project folder and add the following code  

```javascript

const db = require('./db')

const Query = {
    greetingWithAuth:(root,args,context,info)=>{

        if (!context.user) {
            throw new Error('Unauthorized');
          }
        return "Hello from TutorialsPoint, welcome back : "+user.name;
    }
}

module.exports = {Query}

```

### Step 4: Create Server.js file

The JWT authentication middleware authenticates callers using a JWT. If the token is valid, `req.user` will be set with the JSON object decoded to be used by later middleware for authorization and access control.

The url for authenication will be `http://localhost:9000/login` , this will be a post operation and user will have to submit his email and password . It will be validated from the backend, if valid a token is generated using `jwt.sign` method, so for subsequent requests client will have to send this in header.

From the following code to do authentication we would use two modules `jsonwebtoken` and `express-jwt` . Once user successfully signs in a token is generated using `jwt.sign` method .

```javascript
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
//private key
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
  
app.post('/login', (req, res) => {
  const {email, password} = req.body;
  //check database
  const user = db.students.list().find((user) =>  user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  //generate a token based on private key , token doesn't have an expiry
  const token = jwt.sign({sub: user.id}, jwtSecret);
  res.send({token});
});



```

Following code shows how express-jwt is used.For every request `expressJwt` will check user is coming with a token . By default tokens are not required for all request.

```javascript
app.use(expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}));


```

In the server.js for every `/graphql` request we are adding a context object as shown below.  In the context we will pass the user object which is authenticated by JWT token.

```javascript
app.use('/graphql', graphqlExpress((req) => ({
  schema,
  context: {user: req.user && db.students.get(req.user.sub)}
})));


```

Create server.js in current folder path . The complete server.js file is as follows

```javascript
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt'); //auth
const jwt = require('jsonwebtoken'); //auth
const db = require('./db');

var port = process.env.PORT || 9000
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
const app = express();


const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'})
const resolvers = require('./resolvers')
const {makeExecutableSchema}=require('graphql-tools')



const schema = makeExecutableSchema({typeDefs , resolvers})


app.use(cors(), bodyParser.json(), expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}));


const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express')

app.use('/graphql', graphqlExpress((req) => ({
  schema,
  context: {user: req.user && db.students.get(req.user.sub)}
})));
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))


//authenticate students
app.post('/login', (req, res) => {
  const user = db.students.list().find((user) =>  user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({sub: user.id}, jwtSecret);
  res.send({token});
});

app.listen(port, () => console.info(`Server started on port ${port}`));

```

### Step 5: Run the application  

- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a  client to test the application.Open browser and type the url `http://localhost:9000/graphiql` Type the following query in the editor.  

```javascript
{
  greetingWithAuth
}

```

The response is as shown below , since we have not authenticated we will get error.

```javascript
{
  "data": {
    "greetingWithAuth": null
  },
  "errors": [
    {
      "message": "Unauthorized",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "greetingWithAuth"
      ]
    }
  ]
}
```

 Lets create a client application to authenticate

## Setting up the Jquery client

In the client application a greet button is provided which will invoke the schema `greetingWithAuth` , if you click the button without login , it will give you the error message as below .

![jQuery clientUI](https://user-images.githubusercontent.com/9062443/44637227-a5367700-a9cd-11e8-91eb-79ff28e0673d.png)

Once you login with a user available in database the following screen will appear

![3_jquery_app](https://user-images.githubusercontent.com/9062443/44637611-d3b55180-a9cf-11e8-964c-518015d0c117.png)

So for accessing greeting we need to first access `http://localhost:9000/login` route as below , the response will contain the token generated from server.

```javascript

 $.ajax({
            url:"http://localhost:9000/login",
            contentType:"application/json",
            type:"POST",
            data:JSON.stringify({email,password}),
            success:function(response){
                loginToken = response.token;
                $('#authStatus')
                .html("authenticated successfully")
                .css({"color":"green",'font-weight':'bold'});
              $("#greetingDiv").html('').css({'color':''});
            },
            error:(xhr,err)=> alert('error')
        })


```

after login successfulyy we can access `greetingWithAuth` schema as given  below , there should be a `Authorization` for all subsequent request with `bearer` token.

```javascript

  {  url: "http://localhost:9000/graphql",
        contentType: "application/json",
        headers: {"Authorization": 'bearer '+loginToken},  type:'POST',
        data: JSON.stringify({
         query:`{greetingWithAuth}`
  }

```

following is index.html

```javascript

 <!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
$(document).ready(function(){
    let loginToken="";

   $("#btnGreet").click(function(){

        $.ajax({url: "http://localhost:9000/graphql",
        contentType: "application/json",
        headers: {"Authorization": 'bearer '+loginToken},
       type:'POST',
        data: JSON.stringify({
      query:`{greetingWithAuth}` }),
        success: function(result){
            $("#greetingDiv").html("<h1>"+result.data.greetingWithAuth+"</h1>")
        },
        error:function(jQxhr,error){
          if(jQxhr.status==401){
              $("#greetingDiv").html('please authenticate first!!')
              .css({"color":"red",'font-weight':'bold'})
              return;
          }

          $("#greetingDiv").html('error').css("color","red");


        }
    });
    });
    $('#btnAuthenticate').click(function(){
        var email = $("#txtEmail").val();
        var password = $("#txtPwd").val();

        if(email && password) {

        $.ajax({
            url:"http://localhost:9000/login",
            contentType:"application/json",
            type:"POST",
            data:JSON.stringify({email,password}),
            success:function(response){
                loginToken = response.token;
                $('#authStatus')
                .html("authenticated successfully")
                .css({"color":"green",'font-weight':'bold'});
              $("#greetingDiv").html('').css({'color':''});
            },
            error:(xhr,err)=> alert('error')
        })
    }else alert("email and pwd empty")


    })

});
</script>
</head>
<body>
        <h1> GraphQL Authentication </h1>

<hr/>
        <section>
                    <button id="btnGreet">Greet</button>
                    <br/> <br/>
                    <div id="greetingDiv">
                  </div>

        </section>
        <br/> <br/> <br/>
        <hr/>

        <section id="LoginSection">
            <header>
                <h2>*Login first to  access greeting </h2>
            </header>
            <input type="text" value="mohtashim@tutorial.com" placeholder="enter email" id="txtEmail"/>
            <br/>
           <input type="password" value="pass@123" placeholder="enter password" id="txtPwd"/>

            <br/>

            <input type="button" id="btnAuthenticate"  value="Login"/>
            <p id="authStatus"></p>

      </section>
</body>
</html>
```
