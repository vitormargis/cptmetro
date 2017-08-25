#!/usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('../package.json');
var cptmetro = require('./cptmetro');

program.version(pkg.version).description('Show rails system status for S\xE3o Paulo\n\n  Lines:                      Status:\n\n    Linha 1 - Azul            (1) Opera\xE7\xE3o Normal\n    Linha 2 - Verde           (2) Opera\xE7\xE3o Encerrada\n    Linha 3 - Vermelha        (3) Opera\xE7\xE3o Parcial\n    Linha 4 - Amarela         (4) Velocidade Reduzida\n    Linha 5 - Lil\xE1s           (5) Paralisada\n    Linha 15 - Prata          (6) Dados Indispon\xEDveis').option('-l, --line <currency>', 'Show status for specific line. (ex: 1)').option('-s, --status <amount>', 'Show only lines with that status. (ex: 3)').parse(process.argv);

cptmetro({ line: program.line, status: program.status });