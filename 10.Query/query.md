
# Query

A GraphQL operation can be either a read operation or a write operation. A GraphQL query is used to read or fetch values while a mutation is used to write or post values.In either cases, the operation is a simple string that a GraphQL server can parse and respond to with data in a specific format. The popular response format that is usually used for mobile and web applications is JSON.

The syntax to define a query is-  
`query{ someField }`   
  or  
`{ someField }`  

The query keyword is optional.

GraphQL queries help to reduce over fetching of data unlike a Restful API . Suppose a client application needs only student firstName and lastName only then application can just fire query

```javascript
  {
      students{
          id
          firstName
          lastName
      }
  }

```

response from the server is as follows

```javascript
   {
  "data": {
    "students": [
      {
        "id": "S1001",
        "firstName": "Mohtashim",
        "lastName": "Mohammad"
      },
      {
        "id": "S1002",
        "firstName": "Kannan",
        "lastName": "Sudhakaran"
      },
      {
        "id": "S1003",
        "firstName": "Kiran",
        "lastName": "Panigrahi"
      }
    ]
  }
}


```

other details like collegeId and password details are not fetched . so queries are more smaller and less traffic over network , application will be much faster.

## Adding a custom field

Following is the **students.json** file which contains list of students

```javascript
 [

    {
        "id": "S1001",
        "firstName":"Mohtashim",
        "lastName":"Mohammad",
        "email": "mohtashim.mohammad@tutorialpoint.org",
        "password": "pass123",
        "collegeId": "col-102"
      },
      {
        "id": "S1002",
        "email": "kannan.sudhakaran@tutorialpoint.org",
        "firstName":"Kannan",
        "lastName":"Sudhakaran",
        "password": "pass123",
        "collegeId": "col-101"
      },
      {
        "id": "S1003",
        "email": "kiran.panigrahi@tutorialpoint.org",
        "firstName":"Kiran",
        "lastName":"Panigrahi",
        "password": "pass123",
        "collegeId": "col-101"
      }
  ]

```

Note there is no fullName field in the query , now in query we need fullName ,so we need to change the schema file first followed by the resolver function. The fullName will be a **custom field** which does not match with data source field.

step 1: change the **schema.graphql** by adding fullName field add data type as String

```javascript

type Student {
    id:ID!
    firstName:String
    lastName:String
    fullName:String
}


```

step 2: change the **resolvers.js** file , since fullName is field in Student we need to add a Student resolver and export it

```javascript
//for each single student object returned,resolver is invoked
const Student={
    fullName:(root,args,context,info)=>{
        return root.firstName+":"+root.lastName
    }
  }

module.exports = {Query,Student}

```

step 3: type `npm start` on terminal and open browser enter url `http://localhost:9000/graphiql`
type the below query

```javascript
{
   students{
    id
    fullName
  }
}

```

response will be as below

```javascript
{
  "data": {
    "students": [
      {
        "id": "S1001",
        "fullName": "Mohtashim:Mohammad"
      },
      {
        "id": "S1002",
        "fullName": "Kannan:Sudhakaran"
      },
      {
        "id": "S1003",
        "fullName": "Kiran:Panigrahi"
      }
    ]
  }
}

```

## Nested Query

Let us create a nested query for fetching the student details and their college details.

step 1: Add **colleges.json** file which holds collection of colleges in the **data** folder of project

```javascript
[
    {
      "id": "col-101",
      "name": "AMU",
      "location": "Uttar Pradesh",
       "rating":5.0
    },
    {
        "id": "col-102",
        "name": "CUSAT",
        "location": "Kerala",
        "rating":4.5
      }
  ]
  
```

step 2: Modify the **Schema.graphql** to add a field college and define its type

```javascript

type College {
    id:ID!
    name:String
    location:String
    rating:Float

}

type Student {
    id:ID!
    firstName:String
    lastName:String
    fullName:String
    college:College
}

```

step 3: Modify the datastore **db.js** to add colleges collection

```javascript
const { DataStore } = require('notarealdb');
const store = new DataStore('./data');
module.exports = {
  students:store.collection('students'),
  colleges:store.collection('colleges')
};

```

step 4: Modify the **resolvers.js**  to add field college for student resolver object. The college field internally fetches data from the collection of colleges by passing in the collegeId.
The college resolver function will execute for each student object returned from the server.

```javascript
const Student={
    fullName:(root,args,context,info)=>{
        return root.firstName+":"+root.lastName
    },
    college:(root)=>{
      return db.colleges.get(root.collegeId);
  }
  }

module.exports = {Query,Student}

```

step 5: run the application by `npm start` and launch the browser
`http://localhost:9000/graphiql` type following query

```javascript
    {
  students{
    id
    firstName
    college {
      id
      name
      location
      rating
    }
  }
}

```

verify the response

```javascript

{
  "data": {
    "students": [
      {
        "id": "S1001",
        "firstName": "Mohtashim",
        "college": {
          "id": "col-102",
          "name": "CUSAT",
          "location": "Kerala",
          "rating": 4.5
        }
      },
      {
        "id": "S1002",
        "firstName": "Kannan",
        "college": {
          "id": "col-101",
          "name": "AMU",
          "location": "Uttar Pradesh",
          "rating": 5
        }
      },
      {
        "id": "S1003",
        "firstName": "Kiran",
        "college": {
          "id": "col-101",
          "name": "AMU",
          "location": "Uttar Pradesh",
          "rating": 5
        }
      }
    ]
  }
}



```

## What is query variable ,Fragments also to be added
