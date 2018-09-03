
# Application Components

This section we will discuss how the different GraphQL components relate with each other. The entire application components can be divided as following.

|Sr No |  Description              |
|:----:|:--------------------------|
| 1    | Server Side Components    |
| 2    | client Side Components    |

## server Side Components

 **GraphQL server** forms the core component on the server side .GraphQL server allows to parse the queries coming from graphql client applications. Apollo Server is most commonly used implementation of GraphQL specification. Other server programming components include the following.

|Sr No |  Server Essentials   | Description
|:----:|:-------------|:---------------------------
| 1    | Schema| A GraphQL schema is at the center of any GraphQL server implementation and describes the functionality available to the clients which connect to it.
| 2    | Query | A GraphQL query is the client application request to retrieve data from database or legacy API's
| 3    | Resolver|Resolvers provide the instructions for turning a GraphQL operation into data. They resolve the query to data by defining resolver functions.

## GraphQL Client

|Sr No |  tool              | Description
|:----:|:-------------------|:-----------
| 1    | GraphiQL | Browser based interface for editing and testing GraphQL queries , mutations
| 2    | ApolloClient| Best tool to build GraphQL client applications.Integrates well with all javascript front-end


![alt_text](https://user-images.githubusercontent.com/9062443/44956455-5ebbad80-aee2-11e8-8c72-e6a2af824a87.jpg)
