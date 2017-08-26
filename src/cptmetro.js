const chalk = require('chalk');
const ora = require('ora');
const Table = require('cli-table');
const metro = require('./getMETRO');
const cptm = require('./getCPTM');

const spinner = ora({
  text: 'Retrieving metro data...',
  color: 'white',
});

function convertBTC(options) {
  const optionLine = options.line ? options.line.split(',') : false;

  const status = {
    'Status': 'Status',
    'Operação Normal': `${chalk.green('\u2713')} Operação Normal`,
    'Operação Encerrada': `${chalk.red('\u275a')} Operação Encerrada`,
    'Operações Encerradas': `${chalk.red('\u275a')} Operação Encerrada`,
    'Operação Parcial': `${chalk.yellow('\u2770')} Operação Parcial`,
    'Velocidade Reduzida': `${chalk.yellow('\u2770')} Velocidade Reduzida`,
    'Paralisada': `${chalk.red('\u2715')} Paralisada`,
    'Dados Indisponíveis': `${chalk.red('?')} Dado Indisponível`
  };

  spinner.start();
  return Promise.all([metro, cptm]).then((data) => {
    spinner.stop();

    let metroData = data[0];
    let cptmData = data[1];

    if (optionLine) {
      metroData = metroData.filter(line =>
        ((optionLine.indexOf(line.Id) >= 0 || line.Id === '0') ? line : null));
      cptmData = cptmData.filter(line =>
        ((optionLine.indexOf(line.Id) >= 0 || line.Id === '0') ? line : null));
    }

    const table1 = new Table({
      colWidths: metroData.map(() => 23)
    });

    const table2 = new Table({
      colWidths: cptmData.map(() => 23)
    });

    const aAresponseLines = metroData.map(item => [chalk[item.chalk](item.Line)]);
    const aAresponseStatus = metroData.map(item => [status[item.StatusMetro]]);
    const aAresponseStations = metroData.map(item => [`${item.info.stations}`]);
    const aAresponseLength = metroData.map(item => [`${item.info.length}`]);
    const aAresponseInalguration = metroData.map(item => [`${item.info.inalguration}`]);

    const bAresponseLines = cptmData.map(item => [chalk[item.chalk](item.Line)]);
    const bAresponseStatus = cptmData.map(item => [status[item.StatusMetro]]);

    table1.push(
      aAresponseLines,
      aAresponseStatus,
      aAresponseStations,
      aAresponseLength,
      aAresponseInalguration
    );

    table2.push(
      bAresponseLines,
      bAresponseStatus
    );

    console.log('');
    console.log('METRO');
    console.log(table1.toString());
    console.log('');
    console.log('CPTM');
    console.log(table2.toString());
    console.log('');
  }).catch((error) => {
    spinner.stop();
    return error;
  });
}

module.exports = convertBTC;
