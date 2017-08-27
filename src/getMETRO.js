const request = require('request');

const url = 'http://www.viaquatro.com.br/generic/Main/LineStatus';
let tries = 0;

const cliColors = {
  Azul: 'blueBright',
  Verde: 'greenBright',
  Vermelha: 'redBright',
  Lilás: 'magentaBright',
  Prata: 'white',
  Amarela: 'yellowBright'
};

const infos = {
  linha0: {
    stations: 'Stations',
    length: 'Length',
    inalguration: 'Inalguration'
  },
  linha1: {
    stations: 23,
    length: '20.4km',
    inalguration: 1974
  },
  linha2: {
    stations: 14,
    length: '14.7km',
    inalguration: 1991
  },
  linha3: {
    stations: 18,
    length: '22km',
    inalguration: 1979
  },
  linha4: {
    stations: 11,
    length: '12.8km',
    inalguration: 2010
  },
  linha5: {
    stations: 7,
    length: '20.8km',
    inalguration: 2002
  },
  linha15: {
    stations: 2,
    length: '2.9km',
    inalguration: 2014
  }
};

const getMETRO = () =>
  new Promise((resolve, reject) => {
    const req = () => request.get({ url }, (error, response) => {
      if (!error) {
        const apiResponse = JSON.parse(response.body);

        let metroLines = apiResponse.StatusMetro.ListLineStatus;

        const fisrtColumns = {
          Id: '0',
          Color: 'Prata',
          Line: 'Line',
          LineRaw: 'Linha',
          StatusMetro: 'Status'
        };

        const linha4 = {
          Id: '4',
          Color: 'Amarela',
          Line: 'Linha 4 - Amarela',
          LineRaw: 'Linha 4',
          StatusMetro: apiResponse.CurrentLineStatus.Status
        };

        metroLines.push(linha4);
        metroLines.sort((a, b) => (parseFloat(a.Id) - parseFloat(b.Id)));
        metroLines.unshift(fisrtColumns);

        metroLines = metroLines.map((line) => {
          let info = {};
          switch (line.Id) {
            case '0': info = infos.linha0; break;
            case '1': info = infos.linha1; break;
            case '2': info = infos.linha2; break;
            case '3': info = infos.linha3; break;
            case '4': info = infos.linha4; break;
            case '5': info = infos.linha5; break;
            case '15': info = infos.linha15; break;
            default: info = {};
          }

          return Object.assign(line, {
            chalk: cliColors[line.Color], info
          });
        });

        resolve(metroLines);
      } else {
        if (++tries > 5) return reject(error);
        setTimeout(() => req(), 2000);
      }
    });
    req();
  });

module.exports = getMETRO();
