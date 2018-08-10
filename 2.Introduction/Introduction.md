
# Why GraphQL ?

     RESTful API's has been a standard for data communications between mobile devices and server side. REST makes the client applications depend on the server , that means client can only ask for things in the menu , just like on the menu of a restaurant.
     CustomEndpoints have to be made in REST if you need new item which is not in menu.
     Multiple requests have to be made to retrieve data from connected Business objects.
     So client round trips are increased.

    GraphQL was invented in an effort from Facebook to enhance mobile application development . Mobile applications require more complex and custom data fetching needs also they have to be made less dependent on the server.


## Declarative Principle vs Imperative

  Suppose we want to display name and country of John's friends in facebook , a typical
  RESTful api call will be very similar to this

- api/users/smith  <!-- return details of smith-->
- api/friends/{userId}  <!-- returns friends name,countryId-->
- api/countries/{countryId}

using graphQL we can make more declarative call with single request
 - query all friends name of 'smith' along with their country  name
 -  {
     user(name){
         friends{
             name,
             country{
                 name
             }
         }
     }
 }


#Solves Over Fetching Problem