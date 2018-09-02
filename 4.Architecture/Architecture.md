
# Architecture

  GraphQL is a specification. It describes the behaviour of a GraphQL server. It is a set of guidelines that defines how requests and responses should be handled.  For e.g - it specifies the protocols that are supported,format of the data that can be accepted by the server, the format of response returned by the server etc.
 Another important concept of GraphQL is its transport layer agnostics . It can be used with any available network protocol like TCP , websocket or any other transport layer protocol . It is also neutral to database so you can use it with relational or  NoSQL databases.

Your architecture can include a GraphQL Server by following any of the three approaches listed below:
1. GraphQL Server with connected database.
2. GraphQL server to integrate existing system.
3. Hybrid approach with connected database and integration with existing legacy system

## 1. GraphQL server with Connected Database

This Architecture is often used with new projects.This architecture has a GraphQL Server with an integrated database. 
On the receipt of  a Query,the server reads the request payload and fetches the data from the database. The response returned to the client adheres to the format specified in the official GraphQL specification.



![alt text](https://user-images.githubusercontent.com/9062443/43997767-c1475e72-9e02-11e8-911f-8892e1843d0e.png "GraphQL with Connected DB Architecture")

In the above diagram,GraphQL server has an integrated database. A client (desktop / mobile ) communicates with the GraphQL server over HTTP. The GraphQL server processes the request, fetches data from the database and returns it to the client.  
## 2. GraphQL server integrating existing systems

It integrates multiple existing systems behind a single coherent GraphQL API .This is particularly helpful for companies which have legacy infrastructure .One of he challenges for legacy systems are integrating cutting edge technologies. GraphQL unifies existing systems and hide complexity of data fetching logic . So it could even fetch data from multiple RESTful API's.

![2_legacy_systems](https://user-images.githubusercontent.com/9062443/43998570-01ff1e6a-9e16-11e8-96c5-0f703031b68e.png "GraphQL integrating existing systems")

## 3. Hybrid Approach

Finally we can combine both the two approaches and build a GraphQL server that has connected database but still talks to legacy or third party systems.
In this architecture when request is received by the GraphQL server , the server will resolve the request. It will either retrieve data from connected database or from the integrated API's .

![hybrid](https://user-images.githubusercontent.com/9062443/43998674-ae8900c2-9e18-11e8-8f30-7c5f26c1140a.png "hybrid architecture")
