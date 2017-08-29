require('babel-register');
const CPTMetro = require('./src/index').default;

CPTMetro.cptm().then(data => {
  console.log(data);
})

module.exports = require('./src/index').default;
