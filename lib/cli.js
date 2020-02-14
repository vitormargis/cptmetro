#!/usr/bin/env node
'use strict';

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _cliTable = require('cli-table');

var _cliTable2 = _interopRequireDefault(_cliTable);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _getCPTM = require('./getCPTM');

var _getCPTM2 = _interopRequireDefault(_getCPTM);

var _getMETRO = require('./getMETRO');

var _getMETRO2 = _interopRequireDefault(_getMETRO);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_package2.default.version).description(`Show rails system status for São Paulo

  Lines:                      Status:

    Linha 1 - Azul              (1) Operação Normal
    Linha 2 - Verde             (2) Operação Encerrada
    Linha 3 - Vermelha          (3) Operação Parcial
    Linha 4 - Amarela           (4) Velocidade Reduzida
    Linha 5 - Lilás             (5) Paralisada
    Linha 15 - Prata            (6) Dados Indisponíveis`).option('-l, --line <line>', 'Show status for specific line. (ex: 1,2)').option('-s, --status <status>', 'Show only lines with that status. (ex: 1)').parse(process.argv);

const spinner = (0, _ora2.default)({
  text: 'Retrieving metro data...',
  color: 'white'
});

function cptmetro(options) {
  const optionLine = options.line ? options.line.split(',') : false;
  const optionStatus = options.status ? options.status.split(',') : false;

  const statusWithIcon = {
    'Status': 'Status',
    'Operação Normal': `${_chalk2.default.green('\u2713')} Operação Normal`,
    'Operação Encerrada': `${_chalk2.default.red('\u275a')} Operação Encerrada`,
    'Operações Encerradas': `${_chalk2.default.red('\u275a')} Operação Encerrada`,
    'Operação Parcial': `${_chalk2.default.yellow('\u2770')} Operação Parcial`,
    'Velocidade Reduzida': `${_chalk2.default.yellow('\u2770')} Velocidade Reduzida`,
    'Paralisada': `${_chalk2.default.red('\u2715')} Paralisada`,
    'Dados Indisponíveis': `${_chalk2.default.red('?')} Dado Indisponível`
  };

  const statusId = {
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
  return Promise.all([(0, _getMETRO2.default)(), (0, _getCPTM2.default)()]).then(data => {
    spinner.stop();

    let metroData = data[0];
    let cptmData = data[1];

    if (optionLine) {
      metroData = metroData.filter(line => optionLine.indexOf(line.id) >= 0 ? line : null);
      cptmData = cptmData.filter(line => optionLine.indexOf(line.id) >= 0 ? line : null);
    }

    if (optionStatus) {
      metroData = metroData.filter(line => optionStatus.indexOf(statusId[line.status]) >= 0 ? line : null);
      cptmData = cptmData.filter(line => optionStatus.indexOf(statusId[line.status]) >= 0 ? line : null);
    }

    const tableMETRO = new _cliTable2.default({ colWidths: metroData.map(() => 23) });
    const tableCPTM = new _cliTable2.default({ colWidths: cptmData.map(() => 23) });

    const metroAresponseLines = metroData.map(item => [_chalk2.default[item.chalk](item.name)]);
    const metroAresponseStatus = metroData.map(item => [statusWithIcon[item.status]]);

    const cptmAresponseLines = cptmData.map(item => [_chalk2.default[item.chalk](item.name)]);
    const cptmAresponseStatus = cptmData.map(item => [statusWithIcon[item.status]]);

    tableMETRO.push(metroAresponseLines, metroAresponseStatus);
    tableCPTM.push(cptmAresponseLines, cptmAresponseStatus);

    console.log('');
    metroData.length && console.log('METRO');
    metroData.length && console.log(tableMETRO.toString());
    metroData.length && console.log('');
    cptmData.length && console.log('CPTM');
    cptmData.length && console.log(tableCPTM.toString());
    console.log('');
  }).catch(error => {
    spinner.stop();
    console.log('Conection error, try again.');
    return error;
  });
}

cptmetro({ line: _commander2.default.line, status: _commander2.default.status });