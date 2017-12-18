import request from 'request';

const url = 'http://www.viaquatro.com.br/generic/Main/LineStatus';

const cliColors = {
  Azul: 'blueBright',
  Verde: 'greenBright',
  Vermelha: 'redBright',
  Lilás: 'magentaBright',
  Prata: 'white',
  Amarela: 'yellowBright'
};

const addViaQuatro = (metroLines, apiResponse) => {
  metroLines.push({
    Id: '4',
    Color: 'Amarela',
    Line: 'Linha 4 - Amarela',
    LineRaw: 'Linha 4',
    StatusMetro: apiResponse.CurrentLineStatus.Status
  });
  metroLines.sort((a, b) => (parseFloat(a.Id) - parseFloat(b.Id)));
  return metroLines
}

const parseLine = (line) => {
  const parsedLine = {
    id: line.Id,
    color: line.Color,
    name: line.Line,
    status: line.StatusMetro
  }

  return Object.assign(parsedLine, {
    chalk: cliColors[line.Color]
  });
}

const getMETRO = (tries = 0) =>
  new Promise((resolve, reject) => {
    const requestMetro = () => request.get({ url }, (error, response) => {
      if (!error) {
        const apiResponse = JSON.parse(response.body);
        let metroLines = apiResponse.StatusMetro.ListLineStatus;

        metroLines = addViaQuatro(metroLines, apiResponse);
        metroLines = metroLines.map(parseLine);

        return resolve(metroLines);
      }

      if (++tries > 5) return reject(error);
      return setTimeout(() => requestMetro(), 2000);
    });

    requestMetro();
  });

module.exports = getMETRO;
