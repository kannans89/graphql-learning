
# Type System

GraphQL is a strongly typed language. Type System defines the various data types that can be used in a GraphQL application.The type system helps to define the schema , which is a contract between client and server . The commonly used GraphQL data types are as follows-

|Sr No |  Types              |  Description
|:----:|:--------------------------|:------------------
| 1    | Scalar    | Stores a single value
| 2    | Object     | Shows what kind of object can be fetched
| 3   | Query    | Entry point type to other specific types
| 4    | Mutation   | Entry point for data manipulation
| 5   | Enum   | useful in a situation where you need the user to pick from a prescribed list of options

## Scalar Types

These are primitive data types. Scalar types can store only a  single value . The default scalar types that GraphQL offers are:

- **Int** :Signed 32 bit Integer
- **Float**: Signed double precision floating point value
- **String** : UTF‐8 character sequence
- **Boolean** :true or false
- **ID** : A unique identifier, often used as a unique identifier to fetch an object or as the key for a cache.

The Syntax for defining a scalar type is - 

```javacript
   field: data_type
```

The snippet given below defines a field named greeting which returns String value

```javacript
   greeting: String
```

## Object Types

The object type is the most common type used in a schema and represents a group of fields. Each field inside an object type maps to another type, thereby allowing nested types. In other words, an object type is composed of multiple scalar types or Object types.
The Syntax for defining an Object type is - 

```javacript
type object_type_name
{
   field1: data_type
   field2:data_type 
   ....
   fieldn:data_type
   
 }
```

Consider the following code snippet-  


```javascript
--Define an object type--

type Student {
  stud_id:ID
  firstname: String
  age: Int
  score:Float
 
}


--Defining a GraphQL schema--  

type Query
{
 stud_details:[Student]
}

```
The example given above defines an object data-type  `Student`. The `stud_details` field in the root Query schema will return a list of Student objects.

## The Query type

A GraphQL query is to used to fetch data. It is similar to requesting a resource in REST-based APIs. Simply put, the Query type is the request send from a client application to the GraphQL server.GraphQL uses the Schema Definition Language(SDL) to define a Query.Query type is one of the many root-level types in GraphQL.

The syntax for defining a Query is as given below
 ```javascript
 type Query  {
     field1: data_type
     field2:data_type
     field2(param1:data_type,param2:data_type,...paramN:data_type):data_type
 }
 ```

Following is an example of defining a Query :
```javascript
 type Query  {
     greeting: String
 }
 ```
 
## Mutation Type

Mutations are operations sent to the server to create, update or delete data. These are analogous to the PUT, POST, PATCH and DELETE verbs to call REST-based APIs.

Mutation is one of the root-level data-types in GraphQL.The Query type defines the entry-points for data-fetching operations whereas the Mutation type specifies the entry points for data-manipulation operations.  

The syntax for defining a Mutation type is as given below
 ```javascript
 type Mutation {
     field1: data_type
     field2(param1:data_type,param2:data_type,...paramN:data_type):data_type
     
 }
 ```

For example, we can define a mutation type to add a new Student as given below:

```javascript
  type Mutation {
  addStudent(firstName: String, lastName: String): Student
}

```

### Type Marker

Will add extra meaning to a  type

|Sr No |  marker   |  syntax  | example|
|:----:|:---------|:-------------|:-----
| 1|Non-null Type  | `<type>!`  | String!
| 2|List Type  | `[<type>]`  |[String]
| 3|List of Non-null Types   | `[<type>!]`  | [String!]
| 4|Non-null List Type   | `[<type>]!`  | [String]!

### **needToFix** add enum types

We will discuss how to use each of these types in detail in the later chapters.
