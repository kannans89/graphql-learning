const db = require('./db')

const Query = {
    greeting:()=>{
        return "hello from resolver function"
    },
    students:()=>db.students.list(),
    studentById:(root,args,context,info) => {
        return db.students.get(args.id);
    },
    getTime:()=>{
        const today = new Date();
        

        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        
        return `${h}:${m}:${s}`;

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

module.exports = {Query,Student}