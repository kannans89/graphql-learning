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

