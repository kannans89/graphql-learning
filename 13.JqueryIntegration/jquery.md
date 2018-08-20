
#JQuery Integration

To integrate GraphQL with jQuery first lets inspect the graphiql request headers and understand the request parameters.

Start the hello-word app and type the  graphql query `{greeting}` in graphiQL window . Right click and inspect or (ctrl+shift+I) on chrome , go to the network tab as shown below

![1_request_header](https://user-images.githubusercontent.com/9062443/44342005-4f327280-a4a7-11e8-87ff-8afd3bf3547e.png)

From the simple hello world example we can understand that the http method used is **POST** .Now int the browser scroll down the header section to view the *request payload* ,once you click on view code you will see following in request payload section of chrome .

```javascript
  {"query":"{\n  greeting\n}","variables":null,"operationName":null}

```