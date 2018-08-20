

const db = require('./db')

const Query = {
    greeting:()=>{
        return "hello from resolver function"
    },
    students:()=>db.students.list(),
    studentById:(root,args,context,info) => {
        return db.students.get(args.id);
    }
    

}

//for each single student object returned,resolver is invoked
const Student={
    fullName:(root,args,context,info)=>{
        return root.firstName+":"+root.lastName
    },
    college:(root)=>{
        return db.colleges.get(root.collegeId);
    }
  }


  const Mutation ={
    createStudent:(root,args,context,info)=>{

        return db.students.create({collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName})

    },
    addStudent_returns_object:(root,args,context,info)=>{
      const id=  db.students.create({collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName})

            return db.students.get(id)


    }

}

module.exports = {Query,Student,Mutation}