
import React ,{Component} from 'react';

//Apollo Client
import {ApolloClient , HttpLink , InMemoryCache} from 'apollo-boost'
import gql from 'graphql-tag'
const client = new ApolloClient({
    link: new HttpLink({uri:`http://localhost:9000/graphql`}),
    cache:new InMemoryCache()

})

  
class StudentDetail extends Component {

    
    constructor(props){
        super(props);
        this.state={
            student:{firstName:'',lastName:'',college:{name:''}}
        }
        
        const id= this.props.match.params.studentId;
        this.loadStudentsByIdWithApolloClient(id).then(student=>{
            this.setState({
                student
            })
        })
        
    }

    async loadStudentsByIdWithApolloClient(id){


        const query =gql`query queryById($id:ID!){
            studentById(id:$id){
              id
             firstName
             lastName
             college{
               name
             }
             
           }
           }`
        
        const {data} = await  client.query({query,variables:{id}})
        return data.studentById;
    }
    async  loadStudentsById(studentId){
        const response=await fetch('http://localhost:9000/graphql', {
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify({query:`{
            studentById(id:"${studentId}"){
              id
             firstName
             lastName
             college{
               name
             }
             
           }
           }`})
      
        })

        const rsponseBody= await response.json();
        return rsponseBody.data.studentById;

    }

    render(){

        return(
            <div>
               <h1>Showing Students Detail </h1>
               <h1> Student Id: {this.props.match.params.studentId}</h1>
               <div>
                   
                      First Name  is {this.state.student.firstName}<br/>
                      Last  Name  is {this.state.student.lastName} <br/>
                     College  Name  is {this.state.student.college.name} <br/>
                    
               </div>

                </div>
        )
    }
}


export default StudentDetail
