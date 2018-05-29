require('babel-register');
const CPTMetro = require('./src/index').default;

CPTMetro.cptm().then(data => {
  console.log(data);
  console.log('-------');
})

CPTMetro.metro().then(data => {
  console.log(data);
  console.log('-------');
})

module.exports = require('./src/index').default;
