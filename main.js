const jsonfile = require('jsonfile');
const fs = require('fs');
const path = require('path');
const sortJson = require('sort-json');

const folderName = 'translations'; // Name of folder where all locales are kept.
const mainFileName = 'en_US.json'; //Main File in which all labels are kept which are nedded to be translated.
var outputFileName = "output_en_US.json"; //Output File where untranslated label will be placed.
var outputObject = {}; //Output Object will contain all untranslate label (Label is considered as untranslated if it is not translated in any one language)
var isExist = {}; //holds label as key and  count as value where count is number of different files where label is present.
const folderPath = path.resolve(__dirname, folderName); //Path of folder where all json file of loacales kept.
/*Optional Output Path  (Uncomment below part if you want to create output file in specific folder)*/
/*
const outputFolderName="translations";
outputFileName=path.resolve(__dirname,outputFolderName,outputFileName);
*/
var fileNames = fs.readdirSync(folderPath).filter(filename => filename !== mainFileName); //Removing en_US.json file from the list since we are processing it seperately.       
var numberOfFiles = fileNames.length + 1; // count of number of files
/* Reading and extracting labels */
var labelList = Object.keys(jsonfile.readFileSync(path.resolve(folderPath, mainFileName)));
labelList.forEach(label => isExist[label] = 1); //Setting count=1 since it is present in en_US.json file                  

/* Checking whether label exists in translated file or not . */
fileNames.forEach(file => Object.keys(jsonfile.readFileSync(path.resolve(folderPath, file))).forEach(item => isExist[item] += 1)); //Extracting label from the corresponding file and incremetning count of label since it is present in file.
labelList.filter(label => isExist[label] !== numberOfFiles).forEach(label => outputObject[label] = label); //If label is not present in all files will be added in output file

/* Creating output File Note:(If you want to create output file in specific folder replace outputFileName to the outputFilePath and refer line no 13 to 19) */
jsonfile.writeFileSync(outputFileName, outputObject, {
    spaces: 1
});
/*Sorting output json File ignoring case */
sortJson.overwrite(outputFileName, {
    ignoreCase: true
});