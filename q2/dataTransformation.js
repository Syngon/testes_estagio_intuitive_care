//Todos os imports necessarios para executar o codigo
const fs = require('fs');
const path = require('path');
const pdfreader = require("pdfreader");

// Diretorios dos arquivos em constantes, pois caso haja alteracoes futuras, nao precisa trocar pelo codigo
const filePath = path.join(__dirname, 'TISS_novo.pdf');
const jsonFile = path.join(__dirname, 'data.json');

// Tentativa de ler os dados da tabela, infelizmente nao foi possivel
new pdfreader.PdfReader().parseFileItems(filePath, (err, item) => {
    if (err) console.log(err);
    else if (!item) console.log('sem item');
    else if (item.text) {
        let text = item.text;

        fs.appendFile('data1.json', text,  (err) => {
            console.log(err);
        });
        
    }
});






















// fs.readFile(filePath, function (err, buffer) {
//     if (err) return console.log(err);

//     pdf2table.parse(buffer, function (err, rows, rowsdebug) {
//         if (err) return console.log(err);
//         const jsonText = JSON.stringify(rows);

// fs.writeFile('data.json', jsonText, 'utf-8', (err) => {
//     console.log(err);
// });

//     });
// });

// fs.readFile(jsonFile, "utf8", (err, jsonString) => {
//     if (err) {
//         console.log("File read failed:", err);
//         return;
//     }
//     const json = JSON.parse(jsonString);

// json.forEach(function (obj) {
//     let line = JSON.stringify(obj);
//     if (line.includes('Quadro'))
//         console.log(obj);
//         pages.push(line)
// });

// });

//console.log(JSON.stringify(pages));

//const t = tabula(filePath, {pages: "80"});
//t.extractCsv((err, data) => console.log(err, data));