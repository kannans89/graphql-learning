

const db = require('./db')

const Query = {
    greeting:()=>{
        return "hello from resolver function"
    },
    jobs:()=>db.jobs.list(),
    students:()=>db.students.list(),
    job:(root , args)=>{
        return db.jobs.get(args.id)

    },
    studentById:(root,args,context,info) => {
        return db.students.get(args.id);
    },
    greetingWithAuth:(root,args,context,info)=>{

        const {user} = context;
        console.log("inside resolver")
        console.log(context.user);

        if (!context.user) {
            throw new Error('Unauthorized');
          }
        return "Hello from TutorialsPoint, welcome back : "+user.name;
    }
    
}

// since company is a field of job type , companyId is in job object
//job has reference to company ,companyId is foreign key to company
//so wee need job as a separate resolver

//new resolver object for job type

//for each single Job object returned
const Job= {
   company: (root,args,context,info) => {
        //root will be parent object of company that is job itsellf
        //console.log(root);
        return db.companies.get(root.companyId);

   }
}

//for each single student object returned
const Student={
  fullName:(root)=>{
      return "kannan sudhakran is a seeker!!"+"-->"+root.firstName+":"+root.lastName
  },
  college:(root)=>{
      return db.colleges.get(root.collegeId);
      
  }
}


const Mutation ={
    createJob:(root,args,context,info)=>{
        
       return db.jobs.create({companyId:args.companyId,
            title:args.title,
            description:args.description})
        

    },
    createStudent:(root,args,context,info)=>{

        return db.students.create({collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName})

    },
    signUp:(root,args,context,info)=>{
       
        
        const {email,firstName,password} = args.input;

        const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const isValidEmail= emailExpression.test(String(email).toLowerCase())
            console.log(email)

            console.log(isValidEmail)
            if(!isValidEmail) {
            throw new Error("email not in proper format")
            }
        
            if(firstName.length>15){
              throw new Error("firstName should be less than 15 characters")
            }
        
             if(password.length <8 ){
              throw new Error("password should be minimum 8 characters")
             }
        
        
         return "success";
    }

}


module.exports = {Query , Job ,Student , Mutation}