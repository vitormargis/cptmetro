'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = 'https://www.cptm.sp.gov.br/Pages/Home.aspx';
var tries = 0;

var ids = {
  RUBI: '7',
  DIAMANTE: '8',
  ESMERALDA: '9',
  TURQUESA: '10',
  CORAL: '11',
  SAFIRA: '12'
};

var names = {
  RUBI: 'Rubi',
  DIAMANTE: 'Diamante',
  ESMERALDA: 'Esmeralda',
  TURQUESA: 'Turquesa',
  CORAL: 'Coral',
  SAFIRA: 'Safira'
};

var cliColors = {
  RUBI: 'magentaBright',
  DIAMANTE: 'white',
  ESMERALDA: 'greenBright',
  TURQUESA: 'blueBright',
  CORAL: 'redBright',
  SAFIRA: 'blue'
};

var infos = {
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

var getCPTM = function getCPTM() {
  return new Promise(function (resolve, reject) {
    var requestCPTM = function requestCPTM() {
      return _request2.default.get({ url: url }, function (error, response) {
        if (!error) {
          var $ = _cheerio2.default.load(response.body);
          var cptmLines = [];
          $('.situacao_linhas .col-xs-4').each(function (index, item) {
            var name = $(item).children('.nome_linha').text();
            var status = $(item).children().next().text();

            cptmLines[index] = {
              id: ids[name],
              color: names[name],
              name: 'Linha ' + ids[name] + ' - ' + names[name],
              status: status,
              chalk: cliColors[name],
              info: infos[name]
            };
          });

          return resolve(cptmLines);
        }

        if (++tries > 5) return reject(error);
        return setTimeout(function () {
          return requestCPTM();
        }, 2000);
      });
    };

    requestCPTM();
  });
};

module.exports = getCPTM;