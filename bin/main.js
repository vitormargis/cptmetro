#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _cptmetro = require('./cptmetro');

var _cptmetro2 = _interopRequireDefault(_cptmetro);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_package2.default.version).description('Show rails system status for S\xE3o Paulo\n\n  Lines:                      Status:\n\n    Linha 1 - Azul              (1) Opera\xE7\xE3o Normal\n    Linha 2 - Verde             (2) Opera\xE7\xE3o Encerrada\n    Linha 3 - Vermelha          (3) Opera\xE7\xE3o Parcial\n    Linha 4 - Amarela           (4) Velocidade Reduzida\n    Linha 5 - Lil\xE1s             (5) Paralisada\n    Linha 15 - Prata            (6) Dados Indispon\xEDveis').option('-l, --line <currency>', 'Show status for specific line. (ex: 1,2)').option('-s, --status <amount>', 'Show only lines with that status. (ex: 1)').parse(process.argv);

(0, _cptmetro2.default)({ line: _commander2.default.line, status: _commander2.default.status });