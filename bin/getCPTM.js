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

var getCPTM = function getCPTM() {
  return new Promise(function (resolve, reject) {
    var req = function req() {
      return _request2.default.get({ url: url }, function (error, response) {
        if (!error) {
          var $ = _cheerio2.default.load(response.body);
          var json = [];
          var fisrtColumns = {
            Id: '0',
            Color: 'Prata',
            Line: 'Line',
            LineRaw: 'Linha',
            StatusMetro: 'Status',
            chalk: 'white'
          };
          $('.situacao_linhas .col-xs-4').each(function (index, item) {
            var name = $(item).children('.nome_linha').text();
            var status = $(item).children().next().text();

            json[index] = {
              Id: ids[name],
              Color: names[name],
              Line: 'Linha ' + ids[name] + ' - ' + names[name],
              StatusMetro: status,
              chalk: cliColors[name]
            };
          });
          json.unshift(fisrtColumns);
          resolve(json);
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

module.exports = getCPTM();