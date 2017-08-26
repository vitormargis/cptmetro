const request = require('request');
const cheerio = require('cheerio');

const url = 'https://www.cptm.sp.gov.br/Pages/Home.aspx';

const ids = {
  RUBI: '7',
  DIAMANTE: '8',
  ESMERALDA: '9',
  TURQUESA: '10',
  CORAL: '11',
  SAFIRA: '12'
};

const names = {
  RUBI: 'Rubi',
  DIAMANTE: 'Diamante',
  ESMERALDA: 'Esmeralda',
  TURQUESA: 'Turquesa',
  CORAL: 'Coral',
  SAFIRA: 'Safira'
};

const cliColors = {
  RUBI: 'magentaBright',
  DIAMANTE: 'white',
  ESMERALDA: 'greenBright',
  TURQUESA: 'blueBright',
  CORAL: 'redBright',
  SAFIRA: 'blue'
};

const getCPTM = () =>
  new Promise((resolve, reject) => {
    const req = () => request.get({ url }, (error, response) => {
      if (!error) {
        const $ = cheerio.load(response.body);
        const json = [];
        const fisrtColumns = {
          Id: '0',
          Color: 'Prata',
          Line: 'Line',
          LineRaw: 'Linha',
          StatusMetro: 'Status',
          chalk: 'white'
        };
        $('.situacao_linhas .col-xs-4').each((index, item) => {
          const name = $(item).children('.nome_linha').text();
          const status = $(item).children().next().text();

          json[index] = {
            Id: ids[name],
            Color: names[name],
            Line: `Linha ${ids[name]} - ${names[name]}`,
            StatusMetro: status,
            chalk: cliColors[name]
          };
        });
        json.unshift(fisrtColumns);
        resolve(json);
      } else {
        setTimeout(() => {
          req();
        }, 2000);
      }
    });
    req();
  });

module.exports = getCPTM();
