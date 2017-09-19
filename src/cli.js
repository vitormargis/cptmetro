#!/usr/bin/env node

import ora from 'ora';
import chalk from 'chalk';
import Table from 'cli-table';
import program from 'commander';

import cptm from './getCPTM';
import metro from './getMETRO';
import pkg from '../package.json';

program
  .version(pkg.version)
  .description(`Show rails system status for São Paulo

  Lines:                      Status:

    Linha 1 - Azul              (1) Operação Normal
    Linha 2 - Verde             (2) Operação Encerrada
    Linha 3 - Vermelha          (3) Operação Parcial
    Linha 4 - Amarela           (4) Velocidade Reduzida
    Linha 5 - Lilás             (5) Paralisada
    Linha 15 - Prata            (6) Dados Indisponíveis`)

  .option('-l, --line <line>', 'Show status for specific line. (ex: 1,2)')
  .option('-s, --status <status>', 'Show only lines with that status. (ex: 1)')
  .parse(process.argv);

const spinner = ora({
  text: 'Retrieving metro data...',
  color: 'white',
});

function cptmetro(options) {
  const optionLine = options.line ? options.line.split(',') : false;
  const optionStatus = options.status ? options.status.split(',') : false;

  const statusWithIcon = {
    'Status': 'Status',
    'Operação Normal': `${chalk.green('\u2713')} Operação Normal`,
    'Operação Encerrada': `${chalk.red('\u275a')} Operação Encerrada`,
    'Operações Encerradas': `${chalk.red('\u275a')} Operação Encerrada`,
    'Operação Parcial': `${chalk.yellow('\u2770')} Operação Parcial`,
    'Velocidade Reduzida': `${chalk.yellow('\u2770')} Velocidade Reduzida`,
    'Paralisada': `${chalk.red('\u2715')} Paralisada`,
    'Dados Indisponíveis': `${chalk.red('?')} Dado Indisponível`
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
  return Promise.all([metro(), cptm()]).then((data) => {
    spinner.stop();

    let metroData = data[0];
    let cptmData = data[1];

    if (optionLine) {
      metroData = metroData.filter(line =>
        ((optionLine.indexOf(line.id) >= 0) ? line : null));
      cptmData = cptmData.filter(line =>
        ((optionLine.indexOf(line.id) >= 0) ? line : null));
    }

    if (optionStatus) {
      metroData = metroData.filter(line =>
        ((optionStatus.indexOf(statusId[line.status]) >= 0) ? line : null));
      cptmData = cptmData.filter(line =>
        ((optionStatus.indexOf(statusId[line.status]) >= 0) ? line : null));
    }

    const tableMETRO = new Table({
      colWidths: metroData.map(() => 23)
    });

    const tableCPTM = new Table({
      colWidths: cptmData.map(() => 23)
    });

    const aAresponseLines = metroData.map(item => [chalk[item.chalk](item.name)]);
    const aAresponseStatus = metroData.map(item => [statusWithIcon[item.status]]);

    const bAresponseLines = cptmData.map(item => [chalk[item.chalk](item.name)]);
    const bAresponseStatus = cptmData.map(item => [statusWithIcon[item.status]]);

    tableMETRO.push(
      aAresponseLines,
      aAresponseStatus
    );

    tableCPTM.push(
      bAresponseLines,
      bAresponseStatus
    );

    console.log('');
    console.log('METRO');
    console.log(tableMETRO.toString());
    console.log('');
    console.log('CPTM');
    console.log(tableCPTM.toString());
    console.log('');
  }).catch((error) => {
    spinner.stop();
    console.log('Conection error, try again.');
    return error;
  });
}

cptmetro({ line: program.line, status: program.status });
