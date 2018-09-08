
import React ,{Component} from 'react';
import { Link} from 'react-router-dom'

  
//Apollo Client
import {ApolloClient , HttpLink , InMemoryCache} from 'apollo-boost'
import gql from 'graphql-tag'
const client = new ApolloClient({
    link: new HttpLink({uri:`http://localhost:9000/graphql`}),
    cache:new InMemoryCache()

})


class Students extends Component {

    
    constructor(props){
        super(props);
        this.state={
            students:[{id:100,firstName:'test'}],
            serverTime:''
        }
        
        this.loadStudents_noCache().then(data=>{
            this.setState({
                students:data.students,
                serverTime:data.getTime
            })
        })
        
    }

    async loadWithApolloclient(){
    
        console.log("inside apollo client function")
         const query =gql`{
            getTime
            students {
                id
              firstName
            }
          }`;

        const {data} = await  client.query({query})
        return data;

    }

    async  loadStudents_noCache(){
        const response=await fetch('http://localhost:9000/graphql', {
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify({query:`{
            getTime
            students {
                id
              firstName
            }
          }`})
      
        })

        const rsponseBody= await response.json();
        return rsponseBody.data;

    }

    render(){

        return(
            <div>
              <h3>Time from GraphQL server :{this.state.serverTime}</h3>
               <p>Following Students Found </p>
               <div>
                   <ul>
               {
                 this.state.students.map(s=>{
                    return( 
                    <li key={s.id}> 
                   {s.firstName}
                     </li>
                    
                    )
                 })
               }
               </ul>
               </div>

            </div>
        )
    }
}


export default Students
