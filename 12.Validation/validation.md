
# Validation

 When doing mutation on data it is important to validate the user input . GraphQL gives support for required field validation , required fields are not null and must be passed from client side to graphql server.

 ```javascript
  type TypeName {
      field1:String!,
      field2:String!,
      field3:Int!
  }

```

 The above syntax enforces all the fields are not null while submitting data to server.How ever if we want to do additional constraints like string length or number with in range we could write custom logic with in the resolver function .

 Let us create a signup form with basic validation . The form will have email ,firsname and password fields.

 ### Step 1: Download and Install required dependencies for the project  
- Create a folder named **validation-app** .Change the directory to **validation-app** from the terminal.
- Follow steps 3 to 5 explained in the Environment Setup chapter.
   
 ### Step 2: Create a schema  
 Add schema.graphql file in the project folder **validation-app** and add the following code-
 
  ```javascript

type Mutation {
    //add this function
   signUp(input:SignUpInput):String
}

//input type
input SignUpInput {
    email:String!,
    password:String!,
    firstName:String!

}


```
Note to reduce the number of parameters in signUp function we can use the input type - SignUpInput. This . So signUp function takes only one parameter of the type `SignUpInput`.  

### Step 3: Create Resolvers  
Create a file **resolvers.js** in the project folder and add the following code-

```javascript
const Mutation ={
    signUp:(root,args,context,info)=>{

const {email,firstName,password} = args.input;

const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail= emailExpression.test(String(email).toLowerCase())
    if(!isValidEmail)
    throw new Error("email not in proper format")

    if(firstName.length>15)
      throw new Error("firstName should be less than 15 characters")

     if(password.length <8 )
      throw new Error("password should be minimum 8 characters")


        return "success";
    }

}

```
The resolver function `signUp` accepts parameters `email`,`password` and `firstName` . These will be passed through *input* variable so that it can be accessed through `args.input`


### Step 4: Run the application

- Create a server.js file.Refer step 8 in the Environment Setup Chapter. 
- Execute the command npm start in the terminal. The server will be up and running on 9000 port. Here , we will use GraphiQL as a client   to test the application.
Open the browser and type the URL http://localhost:9000/graphiql. Type the following query in the editor.

```javascript

 mutation doSignUp($input:SignUpInput) {
   signUp(input:$input)
}


```

Since input to signup function is a complex type , we need to use query variables in graphiql,for this we need to first give a name to query lets call it doSingUp, the `$input` is the query variable .

Following is the query variable, this must be entered in query variables tab of graphiql

```javascript
 {
   "input":{
     "email": "abc@abc",
    "firstName": "kannan",
    "password": "pass@1234"
  }
}

```

following is the response from server , errors array contains the details of the validation errors.

```javascript
{
  "data": {
    "signUp": null
  },
  "errors": [
    {
      "message": "email not in proper format",
      "locations": [
        {
          "line": 2,
          "column": 4
        }
      ],
      "path": [
        "signUp"
      ]
    }
  ]
}


```

Enter a proper input for each field ,for example-

```javascript
     {
   "input":{
     "email": "abc@abc.com",
    "firstName": "kannan",
    "password": "pass@1234"
  }
}

```

The response will be as below

```javascript
  {
  "data": {
    "signUp": "success"
  }
}

```

In the below query we are not providing the password.

```javascript
 {
   "input":{
     "email": "abc@abc.com",
    "firstName": "kannan"
  }
}

```

If a required field is not provided , then qraphql server will give following error.

```javascript

{
  "errors": [
    {
      "message": "Variable \"$input\" got invalid value {\"email\":\"abc@abc.com\",\"firstName\":\"kannan\"}; Field value.password of required type String! was not provided.",
      "locations": [
        {
          "line": 1,
          "column": 19
        }
      ]
    }
  ]
}

```
