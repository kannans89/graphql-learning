
# Type System

 GraphQL is a strongly typed language  . GraphQL has a type system to describe the data that is possible to query . The type system help to define the schema , which is a contract between client and server .Commonly used datatypes in are as follows

|Sr No |  Types              |  Description
|:----:|:--------------------------|:------------------
| 1    | Scalar    | Stores single value
| 2    | Object     | Shows what kind of object can be fetched
| 3   | Query    | Entry point type to other specific types
| 4    | Mutation   | Entry point for data manipulation
| 5   | Enum   | useful in a situation where you need the user to pick from a prescribed list of options

## Scalar Types

these are primitive types which resolve to single concrete data . the default scalar type which GraphQL offers are .

- Int :Signed 32 bit Integer
- Float: Signed double precision floating point value
- String : UTF‐8 character sequence
- Boolean :true or false
- ID : A unique identifier, often used to refetch an object or as the key for a cache. While serialized as a String, ID signifies that it is not intended to be human‐readable

Syntax for a field named greeting which returns String type

```javacript
   greeting: String
```

## Object Types

The object type is the most common type used in a schema and represents a group of fields. Each field inside of an object type maps to another type, allowing nested types and circular references.

```javascript

type TypeName {
  fieldA: String
  fieldB: Boolean
  fieldC: Int
  fieldD: CustomType
}

type CustomType {
  circular: TypeName
}


```

## The Query type

A GraphQL query is for fetching data and compares to the GET verb in REST-based APIs. Query is the request send from client application to the backend graphql server.

In order to define what queries are possible on a server , the Query type is used within the Schema Definition Language(SDL).he Query type is one of many root-level types which defines functionality (it doesn’t actually trigger a query) for clients and acts as an entry-point to other more specific types within the schema.

 From the helloworld example we seen in the previous section the query syntax is given below.

 ```javascript
 type Query  {
     greeting: String
 }
 ```

client application we used in helloworld example was GraphiQL and to request for greetings query this was the syntax used
`{greeting}` or we can even use `query
{
  greeting
}`

the response from server will be same

```javascript
 {
  "data": {
    "greeting": "Hello GraphQL  From TutorialsPoint !!"
  }
}

```

## Mutation Type

Mutations are operations sent to the server to create, update or delete data. These are comparable to the PUT, POST, PATCH and DELETE verbs on REST-based APIs.

Much like how the Query type defines the entry-points for data-fetching operations on a GraphQL server, the root-level Mutation type specifies the entry points for data-manipulation operations.

For example, when imagining a situation where the API supported adding a new Student, the SDL might implement the following Mutation type:

```javascript
  type Mutation {
  addStudent(firstName: String, lastName: String): Student
}

```

This implements a single addStudent mutation which accepts firstName and lastName as arguments.The important thing to note here is that this mutation will return the newly-created Student object. Sample syntax for mutation query is below .

```javascript
 mutation {
  addStudent(firstName: "Kannan", lastName: "Sudhakaran") {
    firstName
    lastName
  }
}
```

sample  response from server would look like

```javascript
      {
  "data": {
    "addStudent": {
      {
         firstName:"Kannan"
         lastName:"Sudhakaran"
      }
    }
  }
}

```

We will discuss how to do CRUD (Create,Read,Update,Delete) in mutation chapter in detail.

### Type Marker

Will add extra meaning to a  type

|Sr No |  marker   |  syntax  | example|
|:----:|:---------|:-------------|:-----
| 1|Non-null Type  | `<type>!`  | String!
| 2|List Type  | `[<type>]`  |[String]
| 3|List of Non-null Types   | `[<type>!]`  | [String!]
| 4|Non-null List Type   | `[<type>]!`  | [String]!

### **needToFix** add enum types