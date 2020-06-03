const jsonfile=require('jsonfile');
const fs=require('fs');
const path=require('path');

const folderName='translations'; // Name of folder where all locales are kept.
const mainFileName='en_US.json'; //Main File in which all labels are kept which are nedded to be translated.
const outputFileName="output_en_US.json"; //Output File where untranslated label will be placed.
var outputObject={};
const folderPath=path.resolve(__dirname,folderName);  //Path of folder where all json file of loacales kept.
const mainFilePath=path.resolve(folderPath,mainFileName); //Path of en_US.json File
var fileNames=fs.readdirSync(folderPath); 
var numberOfFiles=fileNames.length;

/* Reading and extracting labels */
var data=jsonfile.readFileSync(mainFilePath,function(err){
    if(err) console.log(err);
});

var labelList=Object.keys(data); // List of all labels;
var isExist={}; //holds count as value where count=number of different files where label is present.
labelList.forEach((label)=>{
    isExist[label]=1;
})

/* Checking whether label exists in translated file or not . */
fileNames.forEach(file=>{
    let checkFile=path.resolve(folderPath,file); //Path to the file of different languages
    if(checkFile!== mainFilePath){
        data=jsonfile.readFileSync(checkFile,function(err){
            if(err) console.log(err);
        });    
        Object.keys(data).forEach(item =>{
            isExist[item]+=1;
        }); 
    }
});
labelList.forEach(label => {
    if(isExist[label]!== numberOfFiles){            //If label is not present in all files will be added in output file
        outputObject[label]=label;       
    }
});
/* Creating output File */
jsonfile.writeFileSync(outputFileName,outputObject,{spaces : 1},function(err){
    if(err) console.error(err);
})



