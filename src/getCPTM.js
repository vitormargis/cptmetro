import request from 'request';
import cheerio from 'cheerio';

const url = 'https://www.cptm.sp.gov.br/Pages/Home.aspx';
let tries = 0;

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

const infos = {
  RUBI: {
    stations: 20,
    length: '10.4km',
    inalguration: 1988
  },
  DIAMANTE: {
    stations: 23,
    length: '20.4km',
    inalguration: 1974
  },
  ESMERALDA: {
    stations: 14,
    length: '14.7km',
    inalguration: 1991
  },
  TURQUESA: {
    stations: 18,
    length: '22km',
    inalguration: 1979
  },
  CORAL: {
    stations: 11,
    length: '12.8km',
    inalguration: 2010
  },
  SAFIRA: {
    stations: 7,
    length: '20.8km',
    inalguration: 2002
  }
};



const getCPTM = () =>
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
            chalk: cliColors[name],
            info: infos[name]
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
