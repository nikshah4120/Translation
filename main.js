const jsonfile = require('jsonfile');
const fs = require('fs');
const path = require('path');
const sortJson = require('sort-json');

const folderName = 'translations'; // Name of folder where all locales are kept.
const mainFileName = 'en_US.json'; //Main File in which all labels are kept which are nedded to be translated.
var outputFileName = "output_en_US.json"; //Output File where untranslated label will be placed.
var outputObject = {}; //Output Object will contain all untranslate label (Label is considered as untranslated if it is not translated in any one language)
const folderPath = path.resolve(__dirname, folderName); //Path of folder where all json file of loacales kept.
const mainFilePath = path.resolve(folderPath, mainFileName); //Path of en_US.json File

/*Optional Output Path  (Uncomment below part if you want to create output file in specific folder)*/

/*
const outputFolderName="translations";
outputFileName=path.resolve(__dirname,outputFolderName,outputFileName);
*/

var files = fs.readdirSync(folderPath); //Extracting file names from the folder.                
var numberOfFiles = files.length; // count of number of files


var fileNames = files.filter((filename) => filename !== mainFileName); //Removing en_US.json file from the list since we are processing it seperately.

/* Reading and extracting labels */

var labelList = Object.keys(jsonfile.readFileSync(mainFilePath));

var isExist = {}; //holds label as key and  count as value where count is number of different files where label is present.
labelList.forEach((label) => {
    isExist[label] = 1; //Setting count=1 since it is present in en_US.json file                                             
})

/* Checking whether label exists in translated file or not . */
fileNames.forEach(file => {
    let checkFile = path.resolve(folderPath, file); //Path of the file of different language
    data = Object.keys(jsonfile.readFileSync(checkFile)); //Extracting label from the corresponding file
    data.forEach(item => {
        isExist[item] += 1; //Incremetning count of label since it is present in file.
    });
});

labelList.forEach(label => {
    if (isExist[label] !== numberOfFiles) { //If label is not present in all files will be added in output file
        outputObject[label] = label;
    }
});


/* Creating output File Note:(If you want to create output file in specific folder replace outputFileName to the outputFilePath and refer line no 13 to 19) */
jsonfile.writeFileSync(outputFileName, outputObject, {
    spaces: 1
})

/*Sorting output json File ignoring case */
sortJson.overwrite(outputFileName, {
    ignoreCase: true
});