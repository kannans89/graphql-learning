
# Architecture

  GraphQL is released as a specification to build a GraphQL server . So it is set of guidelines how a server implementation should behave . What request to accept and what response to return from server. This can be build on any programming language.  

Following are the 3 different kinds of architectures that include a GraphQL server:

1. GraphQL Server with connected database.
2. GraphQL server to integrate existing system.
3. Hybrid approach with connected database and integration with existing legacy system

## 1. GraphQL server with Connected Database

This Architecture is often used with new projects.This will be using single webserver that implements GraphQL.When Query reaches the server , it reads the request payload and fetches the data from the DB server and response is given to the client as per the format specified in the official specification.

shown is the architectural diagram of client communicating with a single graphql server over the web
![alt text](https://user-images.githubusercontent.com/9062443/43997767-c1475e72-9e02-11e8-911f-8892e1843d0e.png "GraphQL with Connected DB Architecture")

Another important concept of GraphQL is its transport layer agnostics . It can be used with any available network protocol like tcp , websocket or any other transport . It is also neutral to database so you could use relational or NoSQL databases.

## 2. GraphQL server integrating existing systems

It integrates multiple existing systems behind a single coherent GraphQL API .This is particularly helpful for companies which have legacy infrastructure .One of he challenges for legacy systems are integrating cutting edge technologies. GraphQL unifies existing systems and hide complexity of data fetching logic . So it could even fetch data from multiple RESTful API's.

![2_legacy_systems](https://user-images.githubusercontent.com/9062443/43998570-01ff1e6a-9e16-11e8-96c5-0f703031b68e.png "GraphQL integrating existing systems")

## 3. Hybrid Approach

Finally we can combine both the two approaches and build a GraphQL server that has connected database but still talks to legacy or third party systems.
In this architecture when request is received by the GraphQL server , the server will resolve the request , either will retrieve data from connected database or from the integrated API's .

![hybrid](https://user-images.githubusercontent.com/9062443/43998674-ae8900c2-9e18-11e8-8f30-7c5f26c1140a.png "hybrid architecture")
