
# Query

A GraphQL operation can be either a read or write operation. A GraphQL query is used to read or fetch values while a mutation is used to write or post values.In either cases, the operation is a simple string that a GraphQL server can parse and respond to with data in a specific format. The popular response format that is usually used for mobile and web applications is JSON.

The syntax to define a query is

```javascript

//syntax 1
query query_name{ someField }

//syntax 2
{ someField }
```

An  example query would look like

```javascript

//query with name myQuery
query myQuery{
    greeting
 }

// query without any name
{
  greeting
}

```

From the example it is clear that query keyword is optional.

GraphQL queries help to reduce over fetching of data.Unlike a Restful API, GraphQL allows a user to restrict fields that should be fetched from the server. This means smaller queries and lesser traffic over the network. This in turn reduces the response time.

## Illustration 1: Query Student model with a Custom Field

In this example we have set of students stored in a json file each student model has fields like firstName,lastName , id  but no fullName field available. We will discuss here how to make a query to retrieve fullName of all students. For this we need to create fullName field in schema and  fullName field in resolver . Let us see how to do this in the illustration.

### Step 1 :  Download and Install required dependencies for the project

- Create a folder named **query-app** .Change your directory to **query-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.

### Step 2: Create a schema

Add schema.graphql file in the project folder query-app and add the following code-

```javascript
type Query {
    greeting:String
    students:[Student]
    studentById(id:ID!):Student
}

type Student {
    id:ID!
    firstName:String
    lastName:String
    fullName:String
}


```

Note that there is no fullName field in the the students.json file. However, we need to fetch the fullName of the student via a query. The fullName, in this case will be a **custom field** that isn't available with the data source.  

### Step 3: Create Resolver

Create a file resolvers.js in the project folder and add the following code

```javascript

const db = require('./db')

const Query = {
   //resolver function for greeting
    greeting:()=>{
        return "hello from  TutorialsPoint !!!"
    },
   //resolver function for students returns list
   students:()=>db.students.list(),

    //resolver function for studentbyId
   studentById:(root,args,context,info) => {
     //args will contain parameter passed in query
        return db.students.get(args.id);
  }

  //for each single student object returned,resolver is invoked
const Student={
    fullName:(root,args,context,info)=>{
        return root.firstName+":"+root.lastName
    }
  }

module.exports = {Query,Student}


```

## Step 4: Run the application

- Create a server.js file.Refer step 8 in the Environment Setup Chapter.  
- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client   to test the application.

Open browser and type the url `http://localhost:9000/graphiql` Type the following query in the editor.  

```javascript
{
   students{
    id
    fullName
  }
}

```

The response for the  query will be as given below

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

## Illustration 2: Nested Query

Let us create a nested query for fetching the student details and their college details. We will work with the same project folder.

### Step 1: Edit the Schema

- The schema file already has the student field.Let us add a field college and define its type.

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

### Step 2: Modify the **resolvers.js**

- We need to add a `college` resolver function  as below. The college resolver function will be executed for each student object returned.The `root` parameter of resolver in this case will contain student.

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

The resolver returns college of each student by calling the get method of college collection and  passing the collegeId.
We have assoication realtionship between Student and College through the collegeId.

### Step 3: Test the application

Open the terminal window,navigate to the project folder. Type the command -`npm start`.Launch the browser and enter the URL `http://localhost:9000/graphiql`. Enter the following query in the GraphiQL window

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

## What is Query Variable

If a query has some dynamic values to be passed , then represent these dynamic values using variables. Hence, the query can be reused by the client applications .

### Illustration

### Step 1 : Edit schema file

 Add a sayHello field which takes a string parameter and returns a string.The name values will be dynamic in client application.

 ```javascript

 type Query  {
    sayHello(name:String!):String
}

 ```

### Step 2: Edit resolver.js file

Add a sayHello resolver which takes parameter as below .

```javascript
sayHello:(root,args,context,info)=> `Hi ${args.name} GraphQL server says Hello to you!!`
```

### Step 3: Declare query variable in GraphiQL

- Variable is declared with `$` followed by name of variable for example `$myname_Variable`
- Next the variable declared `$myname_Variable` has to be used with a named query syntax . The query `myQuery` takes string value and passes it on to `sayHello` as shown below.

```javascript

query myQuery($myname_Variable:String!){

   sayHello(name:$myname_Variable)
}

```

- Set the value for the $myname_Variable as a JSON object in the **Query Variables** section of the GraphiQL client.

```javascript
 {
  "myname_Variable": "Mohtashim"
 }
```

response will look like the following.

 ```javascript
    {
  "data": {
    "sayHello": "Hi Mohtashim GraphQL server says Hello to you!!"
  }
}

 ```

 ![1_variable_syntax](https://user-images.githubusercontent.com/9062443/45154943-eb25e300-b1f6-11e8-93bc-df86cf41cae8.png)

## How to use Query Variable with Enum
  
  Let us see how to use a query variable when field parameter is of enum type.

### Step 1: Edit Schema.graphql file

```graphql
enum ColorType {
   RED
   BLUE
   GREEN
}

type Query {
   setFavouriteColor(color:ColorType):String
}

```

The setFavouriteColor function takes enum as input and returns a string value.

### Step 2: Edit resolvers.js file

The resolver function setFavouriteColor takes root and args.
The enum value passed to function at runtime can be accessed through args parameter.

```javascript

setFavouriteColor:(root,args)=>{
        return  "Your Fav Color is :"+args.color;

    }
```

### Step 3: Declare a query variable in GraphiQL

query is named `query_to_setColor` which takes a variable of the named `$color_variable` of the type ColorType.This variable is passed on to method `setFavouriteColor`

```javascript
query query_to_setColor($color_variable:ColorType)
{
  setFavouriteColor(color:$color_variable)
}

```

In the query variable section of GraphiQL type the following code.

```javascript
 {
  "color_variable":"RED"
}

```

response is shown below

```javascript
{
  "data": {
    "setFavouriteColor": "Your Fav Color is :RED"
  }
}

```

![1_variable_syntax_enum](https://user-images.githubusercontent.com/9062443/45158771-a607ae00-b202-11e8-8569-8821b8eb5d4e.png)
