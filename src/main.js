#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const cptmetro = require('./cptmetro');

program
  .version(pkg.version)
  .description(`Show rails system status for São Paulo

  Lines:                      Status:

    Linha 1 - Azul            (1) Operação Normal
    Linha 2 - Verde           (2) Operação Encerrada
    Linha 3 - Vermelha        (3) Operação Parcial
    Linha 4 - Amarela         (4) Velocidade Reduzida
    Linha 5 - Lilás           (5) Paralisada
    Linha 15 - Prata          (6) Dados Indisponíveis`)

  .option('-l, --line <currency>', 'Show status for specific line. (ex: 1)')
  .option('-s, --status <amount>', 'Show only lines with that status. (ex: 3)')
  .parse(process.argv);

cptmetro({ line: program.line, status: program.status });
