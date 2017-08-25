'use strict';

var chalk = require('chalk');
var request = require('request');
var ora = require('ora');
var Table = require('cli-table');

var spinner = ora({
  text: 'Retrieving metro data...',
  color: 'white'
});

function convertBTC(options) {
  var optionLine = options.line ? options.line.split(',') : false;
  var url = 'http://www.viaquatro.com.br/generic/Main/LineStatus';

  var colors = {
    Azul: 'blueBright',
    Verde: 'greenBright',
    Vermelha: 'redBright',
    Lilás: 'magentaBright',
    Prata: 'white',
    Amarela: 'yellowBright'
  };

  var status = {
    'Status': 'Status',
    'Operação Normal': chalk.green('\u2713') + ' Opera\xE7\xE3o Normal',
    'Operação Encerrada': chalk.red('\u275A') + ' Opera\xE7\xE3o Encerrada',
    'Operação Parcial': chalk.yellow('\u2770') + ' Opera\xE7\xE3o Parcial',
    'Velocidade Reduzida': chalk.yellow('\u2770') + ' Velocidade Reduzida',
    'Paralisada': chalk.red('\u2715') + ' Paralisada',
    'Dados Indisponíveis': chalk.red('?') + ' Dado Indispon\xEDvel'
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

  spinner.start();

  request(url, function (error, response, body) {
    var apiResponse = void 0;
    spinner.stop();

    try {
      apiResponse = JSON.parse(body);
    } catch (parseError) {
      console.log(chalk.red('Something went wrong in the API. Try in a few minutes.'));
      return parseError;
    }

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

    if (optionLine) {
      metroLines = metroLines.filter(function (line) {
        return optionLine.indexOf(line.Id) >= 0 || line.Id === '0' ? line : null;
      });
    }

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
        chalk: colors[line.Color], info: info
      });
    });

    var table = new Table({
      colWidths: metroLines.map(function () {
        return 23;
      })
    });

    var responseLines = metroLines.map(function (item) {
      return [chalk[item.chalk](item.Line)];
    });
    var responseStatus = metroLines.map(function (item) {
      return [status[item.StatusMetro]];
    });
    var responseStations = metroLines.map(function (item) {
      return ['' + item.info.stations];
    });
    var responseLength = metroLines.map(function (item) {
      return ['' + item.info.length];
    });
    var responseInalguration = metroLines.map(function (item) {
      return ['' + item.info.inalguration];
    });

    table.push(responseLines, responseStatus, responseInalguration, responseStations, responseLength);

    console.log('');
    console.log('Date updated: ' + apiResponse.StatusMetro.DateUpdateMetro);
    console.log(table.toString());
    console.log('');
  });
}

module.exports = convertBTC;