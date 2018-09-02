
# Why GraphQL

RESTful APIs follow a resource-oriented approach that is clear and well structured. But when the data gets more and more complex, the routes get longer and longer, and sometimes it isn’t even possible to fetch the data you want with a single request. This is where GraphQL comes into play. 
GraphQL structures data in the form of a graph.It has a powerful query syntax for traversing, retrieving, and modifying data.

## 1. Ask for what you need,get exactly that

Send a GraphQL query to your API and get exactly what you need, nothing more and nothing less. GraphQL queries always return predictable results. Applications using GraphQL are fast and stable.Unlike Restful services, these applications can restrict data that should be fetched from the server. The following example will help you understand this better.

Let us consider a business object Student with the attributes id , firstName ,lastName and collegeName .Suppose a mobile application needs to fetch only the firstName and id.If we design a REST endpoint like `/api/v1/students`, it will end up fetching data for all the fields for a student object. This means, data is overfetched by the RESTful service. 

This problem can be solved by using GraphQL. Consider the following sample GraphQL query given below.

```javascript
{
  students{
    id
    firstName
  }
  
}

```

The above query will return values only for the id and firstname fields in the response.The query will not fetch values for other attributes of the student object. The response of the query illustrated above will be as shown below:

```javascript
{
  "data": {
    "students": [
      {
        "id": "S1001",
        "firstName": "Mohtashim"
      },
      {
        "id": "S1002",
        "firstName": "Kannan"
      }
    ]
  }
}

```

## 2. Get many resources in a single request

GraphQL queries  helps to smoothly retrieve associated business objects ,while typical REST APIs require loading from multiple URLs. GraphQL APIs fetch all the data your application needs in a single request. Applications using GraphQL can be quick even on slow mobile network connections.  

Let us consider one more business object College which has the attributes name and location. The Student business object has an association relationship with the College object. If we were to use a REST API in order to fetch the details of students and their college we will end up making two requests to server like `/api/v1/students` and `/api/v1/colleges` .This will lead to under fetching of data , that is less data fetched in each request .So mobile applications are forced to make mulitple calls to server to get the desired data .

However, the mobile application can fetch details for both -Student and College objects in a single request by using GraphQL. The GraphQL query for the same will be- 

```javascript
    {
    students{
        id
        firstName
        lastName
        college{
        name
        location
        }
    }
    }
```

The response will contain exactly the fields in the query .

```javascript
{
  "data": {
    "students": [
      {
        "id": "S1001",
        "firstName": "Mohtashim",
        "lastName": "Mohammad",
        "college": {
          "name": "CUSAT",
          "location": "Kerala"
        }
      },
      {
        "id": "S1002",
        "firstName": "Kannan",
        "lastName": "Sudhakaran",
        "college": {
          "name": "AMU",
          "location": "Uttar Pradesh"
        }
      },
      {
        "id": "S1003",
        "firstName": "Kiran",
        "lastName": "Panigrahi",
        "college": {
          "name": "AMU",
          "location": "Uttar Pradesh"
        }
      }
    ]
  }
  }

```

## 3. Describe what’s possible with a type system

GraphQL queries are based on fields and their associated data types.GraphQL is strongly typed.If there is type mismatch in a GraphQL query, server applications return clear and helpful error messages. This helps in smooth debugging and easy detection of bugs by client applications.GraphQL also provides client side libraries that can help in reducing explicit data conversion and parsing.

 An example of the the Student and College data types is as given below.

```graphql

type Query {
    students:[Student]
}

    type Student {
    id:ID!
    firstName:String
    lastName:String
    fullName:String
    college:College
   }

   type College {
    id:ID!
    name:String
    location:String
    rating:Float
    students:[Student]
 }


  ```

## 4. Move faster with powerful developer tools

GraphQL provides rich developer tools for documentation and testing queries. **GraphiQL** is an excellent tool which generates documentation of the query and its schema. It also gives a query editor to test GraphQL APIs. It also providesintelligent code completion capability while building queries.
