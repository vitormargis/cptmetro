# CPTM & Metro Status

> A Wrapper & CLI to show rails system status for São Paulo.

![Example CLI running](img/cptmetro.gif)

### Installing

```
$ npm install -g cptmetro
```

### Wrapper Usage

```js

  cptmetro.metro().then(data => {
    // Will return  data for METRO
    return data;
  });

  cptmetro.cptm().then(data => {
    // Will return  data for CPTM
    return data;
  });

```

### CLI usage
```sh

Lines:                      Status:

  Linha 1 - Azul            (1) Operação Normal
  Linha 2 - Verde           (2) Operação Encerrada
  Linha 3 - Vermelha        (3) Operação Parcial
  Linha 4 - Amarela         (4) Velocidade Reduzida
  Linha 5 - Lilás           (5) Paralisada
  Linha 15 - Prata          (6) Dados Indisponíveis


Options:

  -V, --version          output the version number
  -l, --line             Show status for specific line. (ex: 1,2)
  -s, --status           Show only lines with that status. (ex: 3)
  -h, --help             output usage information
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
