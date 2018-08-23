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
