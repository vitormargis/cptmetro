'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _cliTable = require('cli-table');

var _cliTable2 = _interopRequireDefault(_cliTable);

var _getMETRO = require('./getMETRO');

var _getMETRO2 = _interopRequireDefault(_getMETRO);

var _getCPTM = require('./getCPTM');

var _getCPTM2 = _interopRequireDefault(_getCPTM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var spinner = (0, _ora2.default)({
  text: 'Retrieving metro data...',
  color: 'white'
});

function convertBTC(options) {
  var optionLine = options.line ? options.line.split(',') : false;
  var optionStatus = options.status ? options.status.split(',') : false;

  var statusWithIcon = {
    'Status': 'Status',
    'Operação Normal': _chalk2.default.green('\u2713') + ' Opera\xE7\xE3o Normal',
    'Operação Encerrada': _chalk2.default.red('\u275A') + ' Opera\xE7\xE3o Encerrada',
    'Operações Encerradas': _chalk2.default.red('\u275A') + ' Opera\xE7\xE3o Encerrada',
    'Operação Parcial': _chalk2.default.yellow('\u2770') + ' Opera\xE7\xE3o Parcial',
    'Velocidade Reduzida': _chalk2.default.yellow('\u2770') + ' Velocidade Reduzida',
    'Paralisada': _chalk2.default.red('\u2715') + ' Paralisada',
    'Dados Indisponíveis': _chalk2.default.red('?') + ' Dado Indispon\xEDvel'
  };

  var statusId = {
    'Status': '0',
    'Operação Normal': '1',
    'Operação Encerrada': '2',
    'Operações Encerradas': '3',
    'Operação Parcial': '4',
    'Velocidade Reduzida': '5',
    'Paralisada': '6',
    'Dados Indisponíveis': '7'
  };

  spinner.start();
  return Promise.all([_getMETRO2.default, _getCPTM2.default]).then(function (data) {
    spinner.stop();

    var metroData = data[0];
    var cptmData = data[1];

    if (optionLine) {
      metroData = metroData.filter(function (line) {
        return optionLine.indexOf(line.Id) >= 0 || line.Id === '0' ? line : null;
      });
      cptmData = cptmData.filter(function (line) {
        return optionLine.indexOf(line.Id) >= 0 || line.Id === '0' ? line : null;
      });
    }

    if (optionStatus) {
      metroData = metroData.filter(function (line) {
        return optionStatus.indexOf(statusId[line.StatusMetro]) >= 0 || statusId[line.StatusMetro] === '0' ? line : null;
      });
      cptmData = cptmData.filter(function (line) {
        return optionStatus.indexOf(statusId[line.StatusMetro]) >= 0 || statusId[line.StatusMetro] === '0' ? line : null;
      });
    }

    var tableMETRO = new _cliTable2.default({
      colWidths: metroData.map(function () {
        return 23;
      })
    });

    var tableCPTM = new _cliTable2.default({
      colWidths: cptmData.map(function () {
        return 23;
      })
    });

    var aAresponseLines = metroData.map(function (item) {
      return [_chalk2.default[item.chalk](item.Line)];
    });
    var aAresponseStatus = metroData.map(function (item) {
      return [statusWithIcon[item.StatusMetro]];
    });
    var aAresponseStations = metroData.map(function (item) {
      return ['' + item.info.stations];
    });
    var aAresponseLength = metroData.map(function (item) {
      return ['' + item.info.length];
    });
    var aAresponseInalguration = metroData.map(function (item) {
      return ['' + item.info.inalguration];
    });

    var bAresponseLines = cptmData.map(function (item) {
      return [_chalk2.default[item.chalk](item.Line)];
    });
    var bAresponseStatus = cptmData.map(function (item) {
      return [statusWithIcon[item.StatusMetro]];
    });

    tableMETRO.push(aAresponseLines, aAresponseStatus, aAresponseStations, aAresponseLength, aAresponseInalguration);

    tableCPTM.push(bAresponseLines, bAresponseStatus);

    console.log('');
    console.log('METRO');
    console.log(tableMETRO.toString());
    console.log('');
    console.log('CPTM');
    console.log(tableCPTM.toString());
    console.log('');
  }).catch(function (error) {
    spinner.stop();
    console.log('Conection error, try again.');
    return error;
  });
}

module.exports = convertBTC;