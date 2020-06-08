const path=require('path');
const jsonfile=require('jsonfile');
const fs=require('fs');
var folderPath=path.resolve(__dirname,'translations/en_US.json');
//const path=path.resolve(__dirname,'translation/en_US.json');
var obj={};

for(let i=0;i<1000000;i++)
{
    obj[`${i}`]=`${i}`;
}
jsonfile.writeFileSync(folderPath,obj,{spaces : 2});

var fileNames=fs.readdirSync(path.resolve(__dirname,'translations'));
fileNames = fileNames.filter(filename => filename !== 'en_US.json');
fileNames.forEach((file)=>{
    obj={};
    for(let i=0;i<100000;i++)
    {
    obj[`${i}`]=`${i}`;
    }
    jsonfile.writeFileSync(path.resolve(__dirname,'translations',file),obj,{spaces : 2});
})
