
# Mutation

Mutation queries does modification to the back-end data.If we want to support any kind of
insert, update, or delete operations on our data, we need to define a mutation property on
the schema.

All mutations should return a result just like select query.Syntax of a mutation query is given below

```javascript
mutation{
    someEditOperation(dataField:"valueOfField")
 }
```

Let us add new student into our datastore using mutation query.

step 1: open the **schema.graphql**  just like query type , we can add mutation type

```javascript

  type Mutation {
    createStudent(collegeId:ID,firstName:String,lastName:String):String
}

```

Note that the function returns a String type this will be the unique identifier(ID) which will be generated after creating a student.

step 2: open the **resolvers.js** add resolver for Mutation type and add Mutation to the module.exports

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

step 3:  run the application by `npm start` and launch the browser
`http://localhost:9000/graphiql` type following query

```javascript
mutation {
  createStudent(collegeId:"col-2",firstName:"Aparna",lastName:"UnniKrishnan")
}


```

response from the server will contain the Id generated

```javascript

  {
  "data": {
    "createStudent": "SkQtxYBUm"
  }
}

```

since a student is created we can query the `studentById`, you can also open the **students.json** file from **data** folder to verify the id.

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
      "fullName": "Aparna:UnniKrishnan"
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

step 3: start the server and type the request query in GraphiQL

```javascript
mutation {
  addStudent_returns_object(collegeId:"col-101",firstName:"Anju",lastName:"Unnikrishnan"){
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
      "fullName": "Anju:Unnikrishnan",
      "college": {
        "id": "col-101",
        "name": "AMU"
      }
    }
  }
}

```
