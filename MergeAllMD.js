var path = require('path'), fs = require('fs');
var mdFilesFound =[];
var firstTimeSearch = true;

function fromDir(startPath, filter) {

  
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

  var files;  

if(firstTimeSearch){
    files = ['1.Home',
            '2.Introduction',
            '3.EnvironmentSetup',
            '4.Architecture',
            '5.ApplicationComponents',
            '6.HelloWorldExample',
            '7.TypeSystem',
            '8.Schema',
            '9.Resolver',
            '10.Query',
            '11.Mutation',
            '12.Validation',
            '13.JqueryIntegration',
            '14.ReactIntegration',
            '15.ApolloClient',
            '16.Authentication',
            '17.Caching'
]
firstTimeSearch=false;
}
else { files = fs.readdirSync(startPath);
}
    for (var i = 0; i < files.length; i++) {
        
       // console.log(startPath)
        var filename = path.join(startPath, files[i]);
      //  console.log(filename)
         var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            if(files[i]=="node_modules" || files[i]=="Merge") {
                         return;
            }

            fromDir(filename, filter); //recurse
           //console.log(stat);
        }
        else if (filename.indexOf(filter) >= 0) {
           //removing some files 
           if(filename.indexOf("TOC") >=0 || filename.indexOf("README")>=0){

           }
          else mdFilesFound.push(filename);
            //console.log('-- found: ', filename);
        };
    };
};

fromDir('../graphql-learning', '.md');

var pageBreak=`<div style="page-break-after: always;"></div>`;
mdFilesFound.map(file=>{
    console.log(file);
    var contents = fs.readFileSync(file).toString()+"\n\n";
    contents= contents+ pageBreak+"\n\n";
    fs.appendFileSync("../graphql-learning/Merge/GraphQL.md",contents);


})











