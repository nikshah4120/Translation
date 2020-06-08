const path=require('path');
const jsonfile=require('jsonfile');
const fs=require('fs')
var fileNames = ['t_es_ES.json','t_ja_JP.json','t_fr_FR.json','t_pt_BR.json','t_de_DE.json','t_hi_IN.json'];
fileNames.forEach((file)=>{
    jsonfile.writeFileSync(path.resolve(__dirname,'merge',file),jsonfile.readFileSync('output_en_US.json'),{spaces : 1});
})
