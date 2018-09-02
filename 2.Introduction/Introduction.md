
# Why GraphQL

RESTful APIs follow a resource-oriented approach that is clear and well structured. But when the data gets more and more complex, the routes get longer and longer, and sometimes it isn’t even possible to fetch the data you want with a single request. This is where GraphQL comes into play. 
GraphQL structures data in the form of a graph.It has a powerful query syntax for traversing, retrieving, and modifying data.

## 1. Ask for what you need,get exactly that

Send a GraphQL query to your API and get exactly what you need, nothing more and nothing less. GraphQL queries always return predictable results. Applications using GraphQL are fast and stable.Unlike Restful services, these applications can restrict data that should be fetched from the server. The following example will help you understand this better.

Let us consider a business object Student with the attributes id , firstName ,lastName and collegeName . If we design a REST endpoint like `/api/v1/students`, it will return all attributes for the student object . Consider a case where a mobile application needs to only fetch the firstName and id.  but still end up fetching data for other fields .
Suppose,an application needs to display the id and firstName of all students, where the student details are stored in an object. have a business object student and client . The sample GraphQL query would look like below.

```javascript
{
  students{
    id
    firstName
  }
  
}

```

Response will contain only id and firstName. The query will not fetch college details or any other associated resources .

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

   GraphQL queries  helps to smoothly retrieve associated business objects ,While typical REST APIs require loading from multiple URLs, GraphQL APIs get all the data your app needs in a single request. Apps using GraphQL can be quick even on slow mobile network connections.  
   For example Student business object have association with College and  mobile application need to display both in a single request.The GraphQL query will look like

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

GraphQL APIs are organized in terms of types and fields, not endpoints unlike a RESTful webservice . Access the full capabilities of your data from a single endpoint. GraphQL uses types to ensure Apps only ask for what’s possible and provide clear and helpful errors. Apps can use types to avoid writing manual parsing code.

GraphQL is strongly typed and a sample type for Student and College is given below.

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

Know exactly what data you can request from your API without leaving your editor, highlight potential issues before sending a query, and take advantage of improved code intelligence. GraphQL makes it easy to build powerful tools like **GraphiQL** by leveraging your API’s type system

## 5. Evolve your API without versions

Add new fields and types to your GraphQL API without impacting existing queries. Aging fields can be deprecated and hidden from tools. By using a single evolving version, GraphQL APIs give apps continuous access to new features and encourage cleaner, more maintainable server code.
