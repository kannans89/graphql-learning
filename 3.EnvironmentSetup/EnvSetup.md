
# Build a GraphQL server with nodejs

1. nodejs
2. express
3. apollo


First we need to setup a  graphQL server. For this we need to install 
- express framework
- cors as initial phase.

what is CORS ?
   this is useful when the client application , which is react app calls the server

what is body-parser?
  graphql request are in json format , so we need a jsonparser
  

Install express and check the express server is running
**server.js**

```javascript 

    const bodyParser = requier('body-parser')
    const cors = require('cors')
    const express = require('express')
    const port = 9000
    
    const app = express()
    app.use(cors() , bodyParser())
    app.listen(port, () => console.log('server running on port ${port}'));
   
```
what are the dependencies for graphql ?
 - graphql
   contains the core graphql functionalities like parsing queries
   
 - graphql-tools
   provides some utility functions
   
   - apollo-server-express@1 
    provides the glue for serving grahql over http on top of express
    
    
 note: make sure apollo server version 1.0 is used 
 
 
 
