
# Schema

A GraphQL schema is at the core of any GraphQL server implementation. It describes the functionality available to the client applications that connect to it. We can use any programming language to create a GraphQL schema and build an interface around it.

The GraphQL runtime defines a generic graph based schema to publish the capabilities of the data service it represents. Client applications an query the schema within its capabilities. This approach decouples clients from servers
and allows both of them to evolve and scale independently.

In this tutorial, we are using Apollo server for executing GraphQL queries. The makeExecutableSchema function in graphql helps you to bind the schema and resolvers. The syntax for using the makeExecutableSchema function is as given below

## makeExecutableSchema Function Syntax

The makeExecutableSchema function takes a single argument of an `Object` type.

```javascript
import { makeExecutableSchema } from 'graphql-tools';

const jsSchema = makeExecutableSchema({
  typeDefs,
  resolvers, // optional
  logger, // optional
  allowUndefinedInResolve = false, // optional
  resolverValidationOptions = {}, // optional
  directiveResolvers = null, // optional
  schemaDirectives = null,  // optional
  parseOptions = {},  // optional
  inheritResolversFromInterfaces = false  // optional
});

```

|Sr No |  parameter  |  Description
|:----:|:--------|:------------------
|   1  | typeDefs|This is a required argument. It represents a GraphQL query as a UTF-8 string.
|    2 | resolvers | This is an optional argument (empty object by default). This should be an object.
| 3 | logger | This is an optional argument. This can be used to print errors to the server console.
| 4 | parseOptions | This is an optional argument .It allows customization of parse when specifying typeDefs as a string.
| 5| allowUndefinedInResolve |  This is true by default. When set to false, causes your resolve functions to throw errors if they return undefined
| 5 |  resolverValidationOptions | This is an optional argument.It accepts an object with boolean properties
| 6| inheritResolversFromInterfaces| This is an optional argument. It accepts a boolean argument to check resolvers object inheritance.

**Illustration**
Let us create a simple application to understand schema . This application will create schema for querying  list of students from the server . The student data will be stored in a flat file and we will use a node module called **notarealdb** to fake a database and read from flat file .

### Step 1 :  Download and Install required dependencies for the project  

- Create a folder named **schema-app** .Change your directory to **schema-app** from the terminal.   
- Follow steps 3 to 5 explained in the Environment Setup chapter.

### Step 2: Create a schema

Add **schema.graphql** file in the project folder **schema-app** and add the following code

```javascript

type Query {
    greeting:String
    students:[Student]
}


type Student {
    id:ID!
    firstName:String
    lastName:String
    password:String
    collegeId:String

}

```

The root of the schema will be **Query** type . The query has two fields greeting and Students that return String and a list of students respectively . Student is declared as an Object type since it contains multiple fields.  The ID field is declared as non-nullable.

### Step 3: Create Resolvers

 Create a file **resolvers.js** in the project folder and add the following code

```javascript

const db = require('./db')

const Query = {
    greeting:()=>{
        return "hello from  TutorialsPoint !!!"
    },
    students:()=>db.students.list()

}
module.exports = {Query}

```

Here `greeting` and `students` are the resolvers that handle the query .`students` resolver function returns a list of students from the data access layer.To access resolver functions outside the module `Query` object has to be exported using module.exports


### Step 4: Run the application
- Create a  **server.js** file.Refer step 8 in the Environment Setup Chapter.
- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client to test the application.Open browser and type the url http://localhost:9000/graphiql.  
Type the following query in the editor.
 
 ```javascript

{
  greeting
  students {
    id
    firstName
    lastName
  }
  
}

```
The query will display the output as shown below-  

![1_student_query](https://user-images.githubusercontent.com/9062443/44244618-714f9a80-a1f2-11e8-84dd-d948ca0e0913.png)


 

**Note** : We can replace the students.json with a RESTful api call to retrieve student data or even a real database like mysql or mongodb. GraphQL becomes a thin wrapper around your original application layer to improve performance .

