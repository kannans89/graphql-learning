# Why GrpahQL

## Solves the problem of  RESTful Routing

   while making a custom end point like api/users/{userId}/firends_and_thier_company_job_vacancies ,this will break RESTful routing conventions.
   as it should be like api/users/{userId}/friends
                       api/user/{userId}/friends/{firendID}/company
  api/user/{userId}/friends/company/{companyId}/jobvacancies

## solves the problem of overserving of data

    list of all companies are returned by default it may return a JSON data which may contain so many details which is not needed .
    for example to retrieve company it will return a sample like

```javascript
var response = {  name:"Tutorials Point",
                  stock_ticker:"TSPT",
                  empCount:1000,
                  domain:"Education",
                  founded:2006,
                  type:"public"
                  founder:"Mohtashim"
              }
```

 But client application only wanted to display name of comapny and its founder but RESTful apis over serving data
solves heavily nested business object relation problem

When you use heavily nested business model to retieve data from server , client application have
to make multiple request to the server .

### Graph Relationship

GraphQL maintains a graph realtionship with all nested objects and uses a query language to walk through the graph data structure and retrieve data . A sample query to retrive a specific use with user id 1001 and display all his friends and comapny name would be like this.

```graphql
query {
  user(id:1001){
      friends {  name
                company{
                name
             }
         }
       }
  }
  ```

 Why GraphQL ?

     RESTful API's has been a standard for data communications between mobile devices and server side. REST makes the client applications depend on the server , that means client can only ask for things in the menu , just like on the menu of a restaurant.
     CustomEndpoints have to be made in REST if you need new item which is not in menu.
     Multiple requests have to be made to retrieve data from connected Business objects.
     So client round trips are increased.

    GraphQL was invented in an effort from Facebook to enhance mobile application development . Mobile applications require more complex and custom data fetching needs also they have to be made less dependent on the server.

Declarative Principle vs Imperative

  Suppose we want to display name and country of John's friends in facebook , a typical
  RESTful api call will be very similar to this

- api/users/smith  <!-- return details of smith-->
- api/friends/{userId}  <!-- returns friends name,countryId-->
- api/countries/{countryId}

using graphQL we can make more declarative call with single request
  query all friends name of 'smith' along with their country  name
   {
     user(name){
         friends{
             name,
             country{
                 name
             }
         }
     }
 }

Solves Over Fetching Problem