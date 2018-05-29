'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = 'http://www.viaquatro.com.br/generic/Main/LineStatus';

var cliColors = {
  Azul: 'blueBright',
  Verde: 'greenBright',
  Vermelha: 'redBright',
  Lilás: 'magentaBright',
  Prata: 'white',
  Amarela: 'yellowBright'
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
  var parsedLine = {
    id: line.Id,
    color: line.Color,
    name: line.Line,
    status: line.StatusMetro
  };

  return Object.assign(parsedLine, {
    chalk: cliColors[line.Color]
  });
};

var getMETRO = function getMETRO() {
  var tries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
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