# How it works?

Translation folder contains different locale.json files in which labels are kept.

As you run main.js script it will output all those labels which aren't translated in all languages(i.e If label is not translated in all language) in output_en_US.json file

merge.js file will merge newly translated labels to  already translated labels
you have to keep all newly translated label files in merge folder and already translated labels to translations file

Below are helper files for test:
mergegenerator.js file generates new translated labels for different locales in mege folder for test 

jsongenerator.js file is generates translated labels in each local file for test


