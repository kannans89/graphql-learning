var path = require('path'), fs = require('fs');
var mdFilesFound =[];

function fromDir(startPath, filter) {

  
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

  
    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        
        var filename = path.join(startPath, files[i]);
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
            console.log('-- found: ', filename);
        };
    };
};

fromDir('../graphql-learning', '.md');

console.log(mdFilesFound);

var writeStream=fs.createWriteStream("../graphql-learning/Merge/big.md");


console.log(mdFilesFound);

mdFilesFound.map(file => {
    var readStream = fs.createReadStream(file);;
    readStream.pipe(writeStream);        

});