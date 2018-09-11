
# Architecture

  GraphQL is a specification. It describes the behaviour of a GraphQL server. It is a set of guidelines that defines how requests and responses should be handled ,like  the supported protocols,format of the data that can be accepted by the server, the format of response returned by the server etc.Request made by a client to the GraphQL server is called a **Query**.
 Another important concept of GraphQL is its transport layer agnostics . It can be used with any available network protocol like TCP , websocket or any other transport layer protocol . It is also neutral to databases,so you can use it with relational or  NoSQL databases.

GraphQL Server can be deployed by using any of the three methods listed below:

1. GraphQL Server with connected database.
2. GraphQL server that integrates existing systems.
3. Hybrid approach .

## 1. GraphQL server with Connected Database

This Architecture is often used with new projects.This architecture has a GraphQL Server with an integrated database.
On the receipt of  a Query,the server reads the request payload and fetches data from the database. This is called **resolving the query**. The response returned to the client adheres to the format specified in the official GraphQL specification.

![1_dbserver_02](https://user-images.githubusercontent.com/9062443/45077482-edab0e80-b10a-11e8-8336-0edc71c117f9.png)

In the above diagram,GraphQL server and the database is integrated on a single node. The client (desktop / mobile ) communicates with GraphQL server over HTTP. The GraphQL server processes the request, fetches data from the database and returns it to the client.

## 2. GraphQL server integrating existing systems

This approach is helpful for companies which have lecgacy infrastructure and different APIs .GraphQL can be used to unify microservices, leagcy infrastructure and third-party APIs in the existing system .

![2_legacy_systems_02](https://user-images.githubusercontent.com/9062443/45077483-ee43a500-b10a-11e8-80ee-8e168e2ac15c.png)

In the above diagram, a GraphQL API acts as an interface between the client and the existing systems.Client applications talk to the GraphQL server which in turn resolves the query.

## 3. Hybrid Approach

Finally we can combine the above two approaches and build a GraphQL server.
In this architecture when request is received by the GraphQL server , the server will resolve the request. It will either retrieve data from connected database or from the integrated API's . This is shown in the figure given below.

![3_hybrid_02](https://user-images.githubusercontent.com/9062443/45077485-ee43a500-b10a-11e8-85cc-0ae156054e89.jpg)