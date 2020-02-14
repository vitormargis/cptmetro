'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getCPTM = require('./getCPTM');

var _getCPTM2 = _interopRequireDefault(_getCPTM);

var _getMETRO = require('./getMETRO');

var _getMETRO2 = _interopRequireDefault(_getMETRO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CPTMetro = () => ({
  cptm: _getCPTM2.default,
  metro: _getMETRO2.default
});

exports.default = CPTMetro();