
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

 Let us create a signup form with basic validation . The form will have email ,firsname and password.

 step 1: Edit the **schema.graphql** add operation signUp in mutation type.

  Note to reduce the number of parameters in signUp function we can use input type.
  So singUp function takes only one parameter of the type `SignUpInput`

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

step 2: Update the **resolvers.js** to add resolver function for signing up.The email,password and firstName will be passed through *input* variable so it can be accessed through `args.input`

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

step 3: Since input to signup function is a complex type , we need to use query variables in graphiql,for this we need to first give a name to query lets call it doSingUp, the `$input` is the query variable .

Following is query

```javascript

 mutation doSignUp($input:SignUpInput) {
   signUp(input:$input)
}


```

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

If you enter a proper input for each field for example

```javascript
     {
   "input":{
     "email": "abc@abc.com",
    "firstName": "kannan",
    "password": "pass@1234"
  }
}

```

the response will be as below

```javascript
  {
  "data": {
    "signUp": "success"
  }
}

```

Given query we are not providing the password.

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
