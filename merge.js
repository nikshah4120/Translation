const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');
const sortJson = require('sort-json');

const mergeFolder = path.resolve(__dirname, 'merge'); //Folder path where new translated labels placed
const translatedFolder = path.resolve(__dirname, 'translations'); //Folder path where we need to merge new translated labels to existing one
fs.readdirSync(mergeFolder).forEach((mergeFile) => {
    const translatedFile = mergeFile.substring(mergeFile.indexOf("_") + 1); //extracting es_ES.json part from t_es_ES.json
    let translatedLabels = jsonfile.readFileSync(path.resolve(translatedFolder, translatedFile)); //Already translated Labels
    let untranslatedLabels = jsonfile.readFileSync(path.resolve(mergeFolder, mergeFile)); //New translated labels
    jsonfile.writeFileSync(path.resolve(translatedFolder, translatedFile), Object.assign(translatedLabels, untranslatedLabels), {
        spaces: 1
    }); //Merging and upadating files.
    sortJson.overwrite(path.resolve(translatedFolder, translatedFile), {
        ignoreCase: true
    }); //Sorting         
    fs.unlink(path.resolve(mergeFolder, mergeFile), (err) => {
        if (err) throw err;
    }); //Removing (i.e t_es_ES.json ) file 
});