
# Mutation

Mutation queries modify data in the data store. It can be used to insert, update, or delete data. 
Mutations are defined as a part of the schema. Mutations should return a value.   

The syntax of a mutation query is as given below:

```javascript
mutation{
    someEditOperation(dataField:"valueOfField")
 }
```

## Illustration

Let us understand how one can add new student record into the datastore using a  mutation query.

### Step 1: Create a project folder by the name MutationApp. Create a folder-data in the project folder. Add a student.json file to this folder.

### Step 2: Create a **schema.graphql** file in the project folder.Define a mutation type in this file as shown below-

```javascript

  type Mutation {
    createStudent(collegeId:ID,firstName:String,lastName:String):String
}

```
Note that the function returns a String type this will be the unique identifier(ID) which will be generated after creating a student.

### Step 3:Create a resolver.js file in the MutationApp project folder.Add a resolver for the Mutation type and add Mutation to the module.exports.

```javascript

  const Mutation ={
    createStudent:(root,args,context,info)=>{

        return db.students.create({collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName})

    }

}

module.exports = {Query ,Student , Mutation}
```

The *args* object will contain the parameters which are passed in the query

### Step 4: Open the terminal window and execute the command `npm start`.Launch the browser and visit the URL `http://localhost:9000/graphiql`. Type the following in the GraphiQL query window. 

```javascript
mutation {
  createStudent(collegeId:"col-2",firstName:"Tim",lastName:"George")
}


```

The above query will create a student object in **student.json** file. The query will return a unique identifier. The response of the query will be as shoen below.

```javascript

  {
  "data": {
    "createStudent": "SkQtxYBUm"
  }
}

```

**confirm if the following is required**
To verify if the student object is created,since a student is created we can query the `studentById`, you can also open the **students.json** file from **data** folder to verify the id.

```javascript
{
    studentById(id:"SkQtxYBUm"){
    id
    fullName
  }
}

```

response from server

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

 Its a best practice to return an object in mutation so once we create a student , lets say the client application want to display the college details also . Rather than making two requests , that is
 1. request to create a student
 2. request to fetch the college details

GraphQL optimizes multiple requests  so we can do this in single request , lets see how to do the same.

step 1: add new method  named `addStudent_returns_object` in mutation type of **schema.graphql**

```javascript

 type Mutation {
  //new method
  addStudent_returns_object(collegeId:ID,firstName:String,lastName:String):Student

  createStudent(collegeId:ID,firstName:String,lastName:String):String
}

```

step 2: update the **resolvers.js** file as below

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

step 3: start the server and type the request query in graphiql

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

response will be as below , this query add a new student as well as retrieves that object along with college object. so this saves round trips to the server

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
