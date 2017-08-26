'use strict';

var request = require('request');
var cheerio = require('cheerio');

var url = 'https://www.cptm.sp.gov.br/Pages/Home.aspx';

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
      return request.get({ url: url }, function (error, response) {
        if (!error) {
          var $ = cheerio.load(response.body);
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
          setTimeout(function () {
            req();
          }, 2000);
        }
      });
    };
    req();
  });
};

module.exports = getCPTM();