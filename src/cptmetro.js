const chalk = require('chalk');
const request = require('request');
const ora = require('ora');
const Table = require('cli-table');

const spinner = ora({
  text: 'Retrieving metro data...',
  color: 'white',
});

function convertBTC(options) {
  const optionLine = options.line ? options.line.split(',') : false;
  const url = 'http://www.viaquatro.com.br/generic/Main/LineStatus';

  const colors = {
    Azul: 'blueBright',
    Verde: 'greenBright',
    Vermelha: 'redBright',
    Lilás: 'magentaBright',
    Prata: 'white',
    Amarela: 'yellowBright'
  };

  const status = {
    'Status': 'Status',
    'Operação Normal': `${chalk.green('\u2713')} Operação Normal`,
    'Operação Encerrada': `${chalk.red('\u275a')} Operação Encerrada`,
    'Operação Parcial': `${chalk.yellow('\u2770')} Operação Parcial`,
    'Velocidade Reduzida': `${chalk.yellow('\u2770')} Velocidade Reduzida`,
    'Paralisada': `${chalk.red('\u2715')} Paralisada`,
    'Dados Indisponíveis': `${chalk.red('?')} Dado Indisponível`
  };

  const infos = {
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

  request(url, (error, response, body) => {
    let apiResponse;
    spinner.stop();

    try {
      apiResponse = JSON.parse(body);
    } catch (parseError) {
      console.log(chalk.red('Something went wrong in the API. Try in a few minutes.'));
      return parseError;
    }

    let metroLines = apiResponse.StatusMetro.ListLineStatus;

    const fisrtColumns = {
      Id: '0',
      Color: 'Prata',
      Line: 'Line',
      LineRaw: 'Linha',
      StatusMetro: 'Status'
    };

    const linha4 = {
      Id: '4',
      Color: 'Amarela',
      Line: 'Linha 4 - Amarela',
      LineRaw: 'Linha 4',
      StatusMetro: apiResponse.CurrentLineStatus.Status
    };

    metroLines.push(linha4);
    metroLines.sort((a, b) => (parseFloat(a.Id) - parseFloat(b.Id)));
    metroLines.unshift(fisrtColumns);

    if (optionLine) {
      metroLines = metroLines.filter(line =>
        ((optionLine.indexOf(line.Id) >= 0 || line.Id === '0') ? line : null));
    }

    metroLines = metroLines.map((line) => {
      let info = {};
      switch (line.Id) {
        case '0': info = infos.linha0; break;
        case '1': info = infos.linha1; break;
        case '2': info = infos.linha2; break;
        case '3': info = infos.linha3; break;
        case '4': info = infos.linha4; break;
        case '5': info = infos.linha5; break;
        case '15': info = infos.linha15; break;
        default: info = {};
      }

      return Object.assign(line, {
        chalk: colors[line.Color], info
      });
    });

    const table = new Table({
      colWidths: metroLines.map(() => 23)
    });

    const responseLines = metroLines.map(item => [chalk[item.chalk](item.Line)]);
    const responseStatus = metroLines.map(item => [status[item.StatusMetro]]);
    const responseStations = metroLines.map(item => [`${item.info.stations}`]);
    const responseLength = metroLines.map(item => [`${item.info.length}`]);
    const responseInalguration = metroLines.map(item => [`${item.info.inalguration}`]);

    table.push(
      responseLines,
      responseStatus,
      responseInalguration,
      responseStations,
      responseLength
    );

    console.log('');
    console.log(`Date updated: ${apiResponse.StatusMetro.DateUpdateMetro}`);
    console.log(table.toString());
    console.log('');
  });
}

module.exports = convertBTC;
