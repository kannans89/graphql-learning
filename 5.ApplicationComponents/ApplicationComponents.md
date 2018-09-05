
# Application Components

This section discusses the different GraphQL components and how they communicate with each other. The entire application components can be distinguished as-

|Sr No |  Description              |
|:----:|:--------------------------|
| 1    | Server Side Components    |
| 2    | Client Side Components    |

## Server Side Components

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


The above diagram shows a client server architecture . The web server is built on NodeJs and Express framework  . A request is made to the Apollo GraphQL Server by a ReactJS application (built using Apollo Client library) or a  GraphiQL browser application.
The query will be parsed and validated against a schema defined in the server. If the request schema passes the validation,then the associated resolver functions will be executed. The resolver will contain code to fetch data from an API or a database .