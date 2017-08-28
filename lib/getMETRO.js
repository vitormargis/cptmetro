'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = 'http://www.viaquatro.com.br/generic/Main/LineStatus';
var tries = 0;

var cliColors = {
  Azul: 'blueBright',
  Verde: 'greenBright',
  Vermelha: 'redBright',
  Lilás: 'magentaBright',
  Prata: 'white',
  Amarela: 'yellowBright'
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

var addViaQuatro = function addViaQuatro(metroLines, apiResponse) {
  metroLines.push({
    Id: '4',
    Color: 'Amarela',
    Line: 'Linha 4 - Amarela',
    LineRaw: 'Linha 4',
    StatusMetro: apiResponse.CurrentLineStatus.Status
  });
  metroLines.sort(function (a, b) {
    return parseFloat(a.Id) - parseFloat(b.Id);
  });
  return metroLines;
};

var parseLine = function parseLine(line) {
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

  var parsedLine = {
    id: line.Id,
    color: line.Color,
    name: line.Line,
    status: line.StatusMetro
  };

  return Object.assign(parsedLine, {
    chalk: cliColors[line.Color], info: info
  });
};

var getMETRO = function getMETRO() {
  return new Promise(function (resolve, reject) {
    var requestMetro = function requestMetro() {
      return _request2.default.get({ url: url }, function (error, response) {
        if (!error) {
          var apiResponse = JSON.parse(response.body);
          var metroLines = apiResponse.StatusMetro.ListLineStatus;

          metroLines = addViaQuatro(metroLines, apiResponse);
          metroLines = metroLines.map(parseLine);

          return resolve(metroLines);
        }

        if (++tries > 5) return reject(error);
        return setTimeout(function () {
          return requestMetro();
        }, 2000);
      });
    };

    requestMetro();
  });
};

module.exports = getMETRO;