
# Type System

reference [schemareference](https://www.apollographql.com/docs/apollo-server/v2/essentials/schema.html)

 GraphQL is a strongly typed language  . GraphQL has a type system to describe the data that is possible to query . The type system help to define the schema , which is a contract between client and server .Commonly used datatypes in are as follows

|Sr No |  Types              |  Description
|:----:|:--------------------------|:------------------
| 1    | Object     | Shows what kind of object can be fetched
| 2    | Scalar    | Stores single value
| 3   | Query    | Entry point type to other specific types
| 4    | Mutation   | Entry point for data manipulation
| 5   | Enum   | useful in a situation where you need the user to pick from a prescribed list of options

## Scalar Types