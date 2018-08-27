
# Authentication

In this section we will learn how to authenticate a graphql client. Here we will create a jQuery client application and on server side we will use express-jwt middleware.This middleware validates JsonWebTokens and sets `req.user` , so authenticated user details can be retrieved from request object.

JSON Web Token is a long string that identifies the logged in user.Once the user login successfully , the server generates a JWT token , it is like a passport to the client . So next time the client comes to the server it has to show its passport so it will get the needed resources. The client can be a mobile application or a web application.

![1_authentication](https://user-images.githubusercontent.com/9062443/44628457-9a43fe00-a95d-11e8-990a-6f7d4ec0ee71.png)

## Install

```javascript
      npm install jsonwebtoken express-jwt
```

## Usage

The JWT authentication middleware authenticates callers using a JWT. If the token is valid, req.user will be set with the JSON object decoded to be used by later middleware for authorization and access control.

Following is the users.json file , user will be authenticated by email and password

```javascript

[
  {
    "id": "12345",
    "email": "mohtashim@tutorial.com",
    "name":"Mohtashim",
    "password": "pass@123"
  },
  {
    "id": "ry9pbwdOz",
    "name":"Kannan",
    "email": "kannan@tutorial.co",
    "password": "kannan@123"
  
  }
]



```

The route for authenication will be `/login` , this will be a post operation and user will have to submit his email and password . It will be validated from the backend, if valid a token is generated using `jwt.sign` method, so for subsequent requests client will have to send this in header.

```javascript
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
  
app.post('/login', (req, res) => {
  const {email, password} = req.body;
  //check database
  const user = db.users.list().find((user) =>  user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  //generate a token based on private key , token doesn't have an expiry
  const token = jwt.sign({sub: user.id}, jwtSecret);
  res.send({token});
});



```

## graphql route change

In the server.js we will modify the route to use `graphqlExpress` function which takes schema and context . In the context we will pass the user object which will be set by JWT in the request after authentication.

```javascript
app.use('/graphql', graphqlExpress((req) => ({
  schema,
  context: {user: req.user && db.users.get(req.user.sub)}
})));


```

Following is  the code sample of server.js file

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

//add new lines

const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express')
//app.use('/graphql',graphqlExpress({schema}))
app.use('/graphql', graphqlExpress((req) => ({
  schema,
  context: {user: req.user && db.users.get(req.user.sub)}
})));

app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))


app.post('/login', (req, res) => {
  const {email, password} = req.body;
  
  console.log(email)
  console.log(password)

  console.log("===========")
  const user = db.users.list().find((user) =>  user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({sub: user.id}, jwtSecret);
  res.send({token});
});




app.listen(port, () => console.info(`Server started on port ${port}`));



```

## Schema

Let us create a schema `greetingWithAuth:String` this will be added in root query object as below. This will return a greeting message only if the user is logged in , other wise a unauthorized exception is thrown

```javascript
type Query {
    greetingWithAuth:String
}


```

## Resolver

In the resolver function using `context` object we can check if user is logged in as below , if user is not logged in then `context.user` will be undefined.

```javascript

  greetingWithAuth:(root,args,context,info)=>{

        const {user} = context;
        console.log("inside resolver")
        console.log(context.user);

        if (!context.user) {
            throw new Error('Unauthorized');
          }
        return "Hello from TutorialsPoint, welcome back : "+user.name;
    }

```

## Client UI

In the client application a greet button is provided which will invoke the schema `greetingWithAuth` , if you click the button without login , it will give you the error message as below .

![jQuery clientUI](https://user-images.githubusercontent.com/9062443/44637227-a5367700-a9cd-11e8-91eb-79ff28e0673d.png)

Once you login with a user available in database the following screen will appear

![3_jquery_app](https://user-images.githubusercontent.com/9062443/44637611-d3b55180-a9cf-11e8-964c-518015d0c117.png)

So for accessing greeting we need to first access `/login` route as below , the response will contain the token generated from server.

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
