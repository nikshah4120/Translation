const jsonfile=require('jsonfile');
const fs=require('fs');
const path=require('path');

const folderName='translations'; // Name of folder where all locales are kept.
const mainFileName='en_US.json'; //Main File in which all labels are kept which are nedded to be translated.
const outputFileName="output_en_US.json"; //Output File where untranslated label will be placed.
var  outputObject={};
const folderPath=path.resolve(__dirname,folderName);  //Path of folder where all json file of loacales kept.
const mainFilePath=path.resolve(folderPath,mainFileName); //Path of en_US.json File

/* Reading and extracting labels */
var data=jsonfile.readFileSync(mainFilePath,function(err){
    if(err) console.log(err);
});

var labelList=Object.keys(data); // List of all labels;
var fileNames=fs.readdirSync(folderPath);
/* Checking whether label exists in translated file or not . */
fileNames.forEach(file=>{
    var checkFile=path.resolve(folderPath,file); //Path to the file of different languages
    if(checkFile!== mainFilePath){
        data=jsonfile.readFileSync(checkFile,function(err){
            if(err) console.log(err);
        });
        var translatedLabels=Object.keys(data);
        labelList.forEach(label => {
            if(translatedLabels.indexOf(label)===-1&& !(label in outputObject)){
                outputObject[label]=label;   //If label is missing from any of the translated file it will be added to the output file for translation again
            }      
        });
    }
});
/* Creating output File */
jsonfile.writeFileSync(outputFileName,outputObject,function(err){
    if(err) console.error(err);
})



