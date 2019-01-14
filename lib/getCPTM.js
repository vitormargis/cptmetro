'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = 'http://www.cptm.sp.gov.br/Pages/Home.aspx';

var ids = {
  RUBI: '7',
  DIAMANTE: '8',
  ESMERALDA: '9',
  TURQUESA: '10',
  CORAL: '11',
  SAFIRA: '12',
  JADE: '13'
};

var names = {
  RUBI: 'Rubi',
  DIAMANTE: 'Diamante',
  ESMERALDA: 'Esmeralda',
  TURQUESA: 'Turquesa',
  CORAL: 'Coral',
  SAFIRA: 'Safira',
  JADE: 'Jade'
};

var cliColors = {
  RUBI: 'magentaBright',
  DIAMANTE: 'white',
  ESMERALDA: 'greenBright',
  TURQUESA: 'blueBright',
  CORAL: 'redBright',
  SAFIRA: 'blue',
  JADE: 'green'
};

var getCPTM = function getCPTM() {
  var tries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return new Promise(function (resolve, reject) {
    var requestCPTM = function requestCPTM() {
      return _request2.default.get({ url: url }, function (error, response) {
        if (!error) {
          var $ = _cheerio2.default.load(response.body);
          var cptmLines = [];

          // Page changes due to election period. Original selector was: .col-xs-4
          $('.situacao_linhas .col-md-2').each(function (index, item) {
            var name = $(item).children('.nome_linha').text();
            var status = $(item).children().next().text();
            cptmLines[index] = {
              id: ids[name],
              color: names[name],
              name: 'Linha ' + ids[name] + ' - ' + names[name],
              status: status,
              chalk: cliColors[name]
            };
          });

          return resolve(cptmLines.filter(function (line) {
            return line.id;
          }));
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