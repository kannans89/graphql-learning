var myfiles = [ '..\\graphql-learning\\1.Home\\home.md',
  '..\\graphql-learning\\2.Introduction\\Introduction.md',
  '..\\graphql-learning\\3.EnvironmentSetup\\EnvSetup.md',
  '..\\graphql-learning\\4.Architecture\\Architecture.md',
  '..\\graphql-learning\\5.ApplicationComponents\\ApplicationComponents.md',
  '..\\graphql-learning\\6.HelloWorldExample\\HelloWorld.md',
  '..\\graphql-learning\\README.md',
  '..\\graphql-learning\\TOC.md' ]

   myfiles=myfiles.filter(f =>  {

        if(f.indexOf("TOC") >=0 || f.indexOf("README")>=0){
            
            return false;
        }
        return true;

  })

  console.log(myfiles)