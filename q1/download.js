//Todos os imports necessarios para executar o codigo
const axios = require('axios');
const cheerio = require('cheerio');
const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

//URL de apoio, em constantes, pois caso haja alteracoes futuras, nao precisa trocar pelo codigo
const url = 'http://www.ans.gov.br/prestadores/tiss-troca-de-informacao-de-saude-suplementar';
const urlToDownload = 'https://www.ans.gov.br';
const fileName = 'TISS_novo.pdf';


// Funcao promise que retorna as divs com classe .alert-link
function axiosPromise() {
    return axios(url).then((response) => {
        // Criacao de variaveis e coleta de html
        const html = response.data;
        const $ = cheerio.load(html);
        const divs = $('.alert.alert-icolink');
        const tableTISS = [];

        // Achando os links e adicionando na lista
        divs.each((div) => {
            const link = $('.alert-link').attr('href');
            tableTISS.push({
                link
            });
        });
        return tableTISS;

    }).catch(console.error);
}

// Funcao que retorna o link da ultima versao
function getLastVersionLink() {
    return axiosPromise().then((table) => {
        const lastVersionLink = table[0].link;
        console.log("LINK PARA ULTIMA VERSAO DO PADRAO: " + (urlToDownload + lastVersionLink));
        return (urlToDownload + lastVersionLink);
    });
}

// Funcao promise que retorna as divs com a classe .table.table-bordered
function LastVersionPromise() {
    return getLastVersionLink().then((lastVersionLink) => {
        return axios(lastVersionLink).then((response) => {
            // Criacao de variaveis e coleta de html
            const html = response.data;
            const $ = cheerio.load(html);
            const divs = $('.table.table-bordered');
            const tableBody = divs.find('tbody');
            const TISSFiles = [];

            // Achando os links e adicionando na lista
            tableBody.find('a').each(function () {
                const link = $(this).attr('href');
                TISSFiles.push({
                    link
                });
            });
            
            return TISSFiles;
        }).catch(console.error);
    });
}

// Funcao que retorna o link para download da ultima versao
function selectTableInfo() {
    return LastVersionPromise().then((table) => {
        const lastVersionFile = table[0].link;
        console.log('LINK PARA DOWNLOAD DA ULTIMA VERSAO: ' + (urlToDownload + lastVersionFile));
        return (urlToDownload + lastVersionFile);
    });
}

// Funcao que executa o download e salva o arquivo
function downloadFile() {
    return selectTableInfo().then((lastVersionFileLink) => {

        const file = fs.createWriteStream(fileName);
        const request = http.get(lastVersionFileLink, function (response) {
            response.pipe(file);
        });
    });
}

downloadFile();