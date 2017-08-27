'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = 'http://www.viaquatro.com.br/generic/Main/LineStatus';
var tries = 0;

var cliColors = {
  Azul: 'blueBright',
  Verde: 'greenBright',
  Vermelha: 'redBright',
  Lilás: 'magentaBright',
  Prata: 'white',
  Amarela: 'yellowBright'
};

var infos = {
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

var getMETRO = function getMETRO() {
  return new Promise(function (resolve, reject) {
    var req = function req() {
      return _request2.default.get({ url: url }, function (error, response) {
        if (!error) {
          var apiResponse = JSON.parse(response.body);

          var metroLines = apiResponse.StatusMetro.ListLineStatus;

          var fisrtColumns = {
            Id: '0',
            Color: 'Prata',
            Line: 'Line',
            LineRaw: 'Linha',
            StatusMetro: 'Status'
          };

          var linha4 = {
            Id: '4',
            Color: 'Amarela',
            Line: 'Linha 4 - Amarela',
            LineRaw: 'Linha 4',
            StatusMetro: apiResponse.CurrentLineStatus.Status
          };

          metroLines.push(linha4);
          metroLines.sort(function (a, b) {
            return parseFloat(a.Id) - parseFloat(b.Id);
          });
          metroLines.unshift(fisrtColumns);

          metroLines = metroLines.map(function (line) {
            var info = {};
            switch (line.Id) {
              case '0':
                info = infos.linha0;break;
              case '1':
                info = infos.linha1;break;
              case '2':
                info = infos.linha2;break;
              case '3':
                info = infos.linha3;break;
              case '4':
                info = infos.linha4;break;
              case '5':
                info = infos.linha5;break;
              case '15':
                info = infos.linha15;break;
              default:
                info = {};
            }

            return Object.assign(line, {
              chalk: cliColors[line.Color], info: info
            });
          });

          resolve(metroLines);
        } else {
          if (++tries > 5) return reject(error);
          setTimeout(function () {
            return req();
          }, 2000);
        }
      });
    };
    req();
  });
};

module.exports = getMETRO();