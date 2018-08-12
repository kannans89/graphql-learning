
# Architecture

 GraphQL itself is a specification . It is just a document which sepdicifes how a grpahql server has to behave . What kind of request it should accept what response the response format
 should like .[graphqlspecfication is here](https://facebook.github.io/graphql) .  
  Suppose yo want to use GrahQL in your project ,you can read the speccification and build it by yourself , in any programming language of your choice . There are reference implementation in nodejs platform.

## Architectural UseCases

- GraphQL Server with connected database.
- GraphQL server to integrate existing system.
- Hybrid approach with connected database and integration with existing legacy system

### GraphQL server with Connected Database

This is often used with new projects.Will be using single webserver that implements GraphQL.When Query reaches the server , it reads the request payload and fetches the data from the DB server and response is given to the client as per the format specified in the official specification.

shown is the architectural diagram of client communicating with a single graphql server over the web
![alt text](https://user-images.githubusercontent.com/9062443/43997767-c1475e72-9e02-11e8-911f-8892e1843d0e.png "GraphQL with Connected DB Architecture")

Another important concept of GraphQL is its transport layer agnostics . It can be used with any available network protocol like tcp , websocket or any other transport . It is also agnostics to database so you could use relational or nosql databases.

### GraphQL server integrating existing systems

It integrates multiple existing systems behind a single coherent GraphQL API .This is particularly helpful for companies which have legacy infrastructure .One of he challenges for legacy systems are integrating cutting edge technologies. GrahphQL unifies existing systems and hide complexity of data fetching logic . So it could fetch data from multiple RESTful webservices.

![2_legacy_systems](https://user-images.githubusercontent.com/9062443/43998570-01ff1e6a-9e16-11e8-96c5-0f703031b68e.png "GraphQL integrating existing systems")

### Hybrid Approach

Finally we can combine both the two approaches and build a GraphQL server that has connected database but still talks to legacy or third party systems.
In this architecture when request is received by the GraphQL server , the server will resolve the request , either will retrieve data from connected database or from the integrated API's .

![hybrid](https://user-images.githubusercontent.com/9062443/43998674-ae8900c2-9e18-11e8-8f30-7c5f26c1140a.png "hybrid architecture")

How does graphql can cope with both
environments ?

this is because of the concept of a resolver function.