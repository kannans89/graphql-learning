
# Mutation

Mutation queries modify data in the data store. It can be used to insert, update, or delete data.  
Mutations are defined as a part of the schema. Mutation query can  return a value.

The syntax of a mutation query is as given below:

```javascript
mutation{
    someEditOperation(dataField:"valueOfField"):returnType
 }
```

## Illustration

Let us understand how one can add new student record into the datastore using a  mutation query.

### Step 1: Download and Install required dependencies for the project 

- Create a project folder by the name **mutation-app**.Change your directory to **mutation-app** from the terminal.  
- Follow steps 3 to 5 explained in the Environment Setup chapter.

### Step 2: Create a **schema.graphql** file

Add schema.graphql file in the project folder mutation-app and add the following code

```javascript

  type Mutation {
    createStudent(collegeId:ID,firstName:String,lastName:String):String
}

```

Note that the function returns a String type this will be the unique identifier(ID) which will be generated after creating a student.

### Step 3: Create a resolver.js file

Create a file resolvers.js in the project folder and add the following code.  

```javascript
 const db = require('./db')
  const Mutation ={
    createStudent:(root,args,context,info)=>{

        return db.students.create({collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName})

    }

}

module.exports = {Mutation}
```
The mutation function points to students collection in the datastore . To add a new student invoke the create method in students collection. The *args* object will contain the parameters which are passed in the query.The create method of students collection will return the id of a newly created student object.

## Step 4: Run the application 

- Create a server.js file.Refer step 8 in the Environment Setup Chapter. 
- Execute the command `npm start` in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a       client to test the application.  

Open browser and type the url http://localhost:9000/graphiql. Type the following query in the editor.  

```javascript

//college Id should be matched with data from colleges.json for easy retrieval
mutation {
  createStudent(collegeId:"col-2",firstName:"Tim",lastName:"George")
}


```

The above query will create a student object in **student.json** file. The query will return a unique identifier. The response of the query will be as shown below.

```javascript

  {
  "data": {
    "createStudent": "SkQtxYBUm"
  }
}

```

To verify if the student object is created,since a student is created we can use the `studentById` query, you can also open the **students.json** file from **data** folder to verify the id. To use `studentById`  query do the following

- Edit the schema.graphql as given below

```javascript
type Query {
    studentById(id:ID!):Student
}


type Student {
    id:ID!
    firstName:String
    lastName:String
    password:String
    collegeId:String

}

````

- Edit the resolver.js file as given below.

```javascript

   studentById:(root,args,context,info) => {
     //args will contain parameter passed in query
        return db.students.get(args.id);
  }


```

This will be the query to get student by the unique id returned from the mutation query.

```javascript
{
    studentById(id:"SkQtxYBUm"){
    id
    fullName
  }
}

```

The response from server is given below-

```javascript

{
  "data": {
    "studentById": {
      "id": "SkQtxYBUm",
      "fullName": "Tim:John"
    }
  }
}


```

## Returning an Object in mutation

It is a best practice to return an object in mutation.Say for example, the client application wants to fetch student and college details.In this case rather than making two different requests, we can create a query that returns an object that contains students and their college details.

### Step 1: Add a new method  named `addStudent_returns_object` in mutation type of **schema.graphql**

```javascript

 type Mutation {
  //new method
  addStudent_returns_object(collegeId:ID,firstName:String,lastName:String):Student

  createStudent(collegeId:ID,firstName:String,lastName:String):String
}

```

### Step 2: Update the **resolvers.js** file as below

```javascript

     const Mutation ={
    createStudent:(root,args,context,info)=>{

        return db.students.create({collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName})

    },
    // new resolver function
    addStudent_returns_object:(root,args,context,info)=>{
      const id=  db.students.create({collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName})

            return db.students.get(id)


    }

}


```

### Step 3: Start the server and type the request query in GraphiQL

```javascript
mutation {
  addStudent_returns_object(collegeId:"col-101",firstName:"Susan",lastName:"George"){
    id
    fullName
    college{
      id
      name
    }
  }
}

```

The response will be as below , this query add a new student as well as retrieves that object along with college object. This saves round trips to the server

```javascript
  {
  "data": {
    "addStudent_returns_object": {
      "id": "rklUl08IX",
      "fullName": "Susan:George",
      "college": {
        "id": "col-101",
        "name": "AMU"
      }
    }
  }
}

```
