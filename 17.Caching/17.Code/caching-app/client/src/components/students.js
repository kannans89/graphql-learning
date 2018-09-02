
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
            students:[{id:701,firstName:'test'}]
        }
        
        this.loadWithApolloclient().then(students=>{
            this.setState({
                students
            })
        })
        
    }

    async loadWithApolloclient(){
    
        console.log("inside apollo client function")
         const query =gql`{
            students {
                id
              firstName
            }
          }`;

        const {data} = await  client.query({query})
        return data.students;

    }

    async  loadStudents(){
        const response=await fetch('http://localhost:9000/graphql', {
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify({query:`{
            students {
                id
              firstName
            }
          }`})
      
        })

        const rsponseBody= await response.json();
        return rsponseBody.data.students;

    }

    render(){

        return(
            <div>
               <h1>Following Students Found </h1>
               <div>
               {
                 this.state.students.map(s=>{
                    return( 
                    <h2 key={s.id}> 
                    <Link to={"/students/"+s.id}>{s.firstName}</Link>
                     </h2>
                    
                    )
                 })
               }
               </div>

                </div>
        )
    }
}


export default Students
