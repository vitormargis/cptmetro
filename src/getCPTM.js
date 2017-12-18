import request from 'request';
import cheerio from 'cheerio';

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

const getCPTM = (tries = 0) =>
  new Promise((resolve, reject) => {
    const requestCPTM = () => request.get({ url }, (error, response) => {
      if (!error) {
        const $ = cheerio.load(response.body);
        const cptmLines = [];
        $('.situacao_linhas .col-xs-4').each((index, item) => {
          const name = $(item).children('.nome_linha').text();
          const status = $(item).children().next().text();

          cptmLines[index] = {
            id: ids[name],
            color: names[name],
            name: `Linha ${ids[name]} - ${names[name]}`,
            status: status,
            chalk: cliColors[name]
          };
        });

        return resolve(cptmLines);
      }

      if (++tries > 5) return reject(error);
      return setTimeout(() => requestCPTM(), 2000);
    });

    requestCPTM();
  });

module.exports = getCPTM;
