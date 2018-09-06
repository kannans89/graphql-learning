
# Query

A GraphQL operation can be either a read or write operation. A GraphQL query is used to read or fetch values while a mutation is used to write or post values.In either cases, the operation is a simple string that a GraphQL server can parse and respond to with data in a specific format. The popular response format that is usually used for mobile and web applications is JSON.

The syntax to define a query is-  
`query{ someField }`   
  or  
`{ someField }`  

The query keyword is optional.

GraphQL queries help to reduce over fetching of data.Unlike a Restful API, GraphQL allows a user to restrict fields that should be fetched from the server. This means smaller queries and lesser traffic over the network. This in turn reduces the response time.

## Illustration : Query with a Custom Field Name  

### Step 1. Create a  project folder by the name QueryApp. Within this folder create another folder **data** .Add a **students.json** file to the **data** folder. This file will contain details for a list of students.

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

### Step 2: Create the **schema.graphql** file to the **QueryApp** folder.

Note that there is no fullName field in the the students.json file. However, we need to fetch the fullname of the student via a query. The fullName, in this case will be a **custom field** that isn't available with the data source.

```javascript

type Student {
    id:ID!
    firstName:String
    lastName:String
    fullName:String
}


```
### Step 3: Create a **db.js** file in the **QueryApp** folder. Add the following code.

```javascript
const { DataStore } = require('notarealdb');
const store = new DataStore('./data');
module.exports = {
  students:store.collection('students'),
  colleges:store.collection('colleges')
};

```

### Step 4: Add the **resolvers.js** file to the **QueryApp** folder.
Since the fullName is  not available as  a field in Student.json file, we need to add a Student resolver and export it. This is shown in the code given below-

```javascript
//for each single student object returned,resolver is invoked
const Student={
    fullName:(root,args,context,info)=>{
        return root.firstName+":"+root.lastName
    }
  }

module.exports = {Query,Student}

```

### Step 5: Test the application
Open the terminal window and type `npm start` . Open  the browser  and enter the URL `http://localhost:9000/graphiql`.
Type the following query in the GraphiQL window-

```javascript
{
   students{
    id
    fullName
  }
}

```

The response for the  query will be as given below-

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

## Illustration: Nested Query

Let us create a nested query for fetching the student details and their college details. We will work with the same project folder. 

### Step 1: We already have the **students.json** in the **data** folder (created in the previous illustration). Add **colleges.json** file to the **data** folder.This file will hold a collection of colleges.

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

### Step 2: Edit the **Schema.graphql**(created in the previous illustration) in the **QueryApp** folder.The file already has the student field.Let us add a field college and define its type. The complete **Schema.graphql** file will be as given below.

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

### Step 3: Modify the **db.js** in the **QueryApp** folder to add a collection that points to the list of colleges. The complete code will be as  given below-  

```javascript
const { DataStore } = require('notarealdb');
const store = new DataStore('./data');
module.exports = {
  students:store.collection('students'),
  colleges:store.collection('colleges')
};

```

#### Step 4: Modify the **resolvers.js** in the **QueryApp** folder to add a field `college` for the student resolver object. 
The `college` field passes in the collegeId and fetches data from the collection of colleges. The college resolver function will be executed for each student object returned from the server.

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

### Step 5: Test the application. 
Open the terminal window,navigate to the project folder. Type the command -`npm start`.Launch the browser and enter the url `http://localhost:9000/graphiql`. Enter the following query in the GraphiQL window-


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

The response for the query will be as given below-

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

## What is query variable ,Fragments also to be added:::  Add an example for enum,query variable and fragments

