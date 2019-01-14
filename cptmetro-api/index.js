import fs from 'fs'
import http from 'http'
import HttpCors from 'http-cors'
import cptmetro from '../cptmetro-crawler';

var cors = new HttpCors();
const updateTime = 300000;
const dataFile = './app/data.json';
const status = {
  'Status': '0',
  'Operação Normal': '1',
  'Operação Encerrada': '2',
  'Operações Encerradas': '3',
  'Operação Parcial': '4',
  'Velocidade Reduzida': '5',
  'Paralisada': '6',
  'Dados Indisponíveis': '7'
};

const stringify = data => JSON.stringify(data)
const parse = data => JSON.parse(data)

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function filterLines(url, response) {
  const linesQuery = getParameterByName('lines', url);
  if (linesQuery) {
    return response.filter(line =>
      ((linesQuery.split(',').indexOf(line.id) >= 0) ? line : null));
  }
  return response;
}

function filterStatus(url, response) {
  const statusQuery = getParameterByName('status', url);
  if (statusQuery) {
    return response.filter(line =>
      ((statusQuery.split(',').indexOf(status[line.status]) >= 0) ? line : null));
  }
  return response;
}

function paramFiltering(url, response, obj) {
  obj.metro = response[0];
  obj.cptm = response[1];

  obj.metro = filterLines(url, obj.metro);
  obj.metro = filterStatus(url, obj.metro);
  obj.cptm = filterLines(url, obj.cptm);
  obj.cptm = filterStatus(url, obj.cptm);

  return obj;
}

http.createServer((req, res) => {
  if (cors.apply(req, res)) return;
  let body = ''; // eslint-disable-line
  req.on('readable', () => { body += req.read(); });
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  const url = req.url;
  const currentDate = new Date().getTime();
  let cptmetroData = { current_date: currentDate };

  req.on('end', () =>
    fs.readFile(dataFile, 'utf8', (err, data) => {
      const savedDate = data && parse(data).current_date || 0;

      if (currentDate - savedDate > updateTime) {
        return Promise.all([cptmetro.metro(), cptmetro.cptm()])
          .then(cptmetroResponse => {
            cptmetroData.metro = cptmetroResponse[0];
            cptmetroData.cptm = cptmetroResponse[1];
            return fs.writeFile(dataFile, stringify(cptmetroData), () => {
              cptmetroData = paramFiltering(url, cptmetroResponse, cptmetroData);
              return res.end(stringify(cptmetroData))
            });
          })
          .catch(error => res.end(stringify({ error })))
      }

      data = parse(data)
      cptmetroData = paramFiltering(url, [data.metro, data.cptm], data)
      return res.end(stringify(data))
    })
  );
}).listen(9999);
