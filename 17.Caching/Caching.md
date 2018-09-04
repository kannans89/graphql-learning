# Caching

The graphql client applications have to handle caching on their end.One possible pattern for this is reserving a field, like `id`, to be a globally unique identifier. The sample schema of students and their college details  uses this approach:

```javascript
/* Query*/
 {
  students{
    id
    firstName
    lastName
    college{
      id
      name
    }
  }
}

```

A sample response from server for the above query.

```javascript
/* Response */
{
  "data": {
    "students": [
      {
        "id": "S1001",
        "firstName": "Mohtashim",
        "lastName": "Mohammad",
        "college": {
          "id": "col-102",
          "name": "CUSAT"
        }
      },
      {
        "id": "S1002",
        "firstName": "Kannan",
        "lastName": "Sudhakaran",
        "college": {
          "id": "col-101",
          "name": "AMU"
        }
      },
      {
        "id": "S1003",
        "firstName": "Kiran",
        "lastName": "Panigrahi",
        "college": {
          "id": "col-101",
          "name": "AMU"
        }
      }
    ]
  }
}


```

This is a powerful tool for  GraphQL client side developers. In the same way that the URLs of a REST based API provided a globally unique key, the `id` field in this system provides a globally unique key.

## How to verify client queries are being cached

  To understand caching lets create an application in reactjs without ApolloClient . We will request for resources from reactjs using the fetch api for http calls. Fetch api does not cache graphql queries. After that we will modify the code to install apollo client and use caching.

  Step 1: Create react app without ApolloClient
  

To do client caching we need to install Apollo client for this
first fire following commands

```javascript
c:\17.Code\caching-app\client>npm install apollo-boost graphql

```