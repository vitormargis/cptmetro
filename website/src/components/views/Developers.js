import React, { Component } from 'react';
import animateRoute from 'utils/animateRoute'

import "prismjs/themes/prism.css";
import { Prism } from "prismjs";
// import PrismCode from '@maji/react-prism'
import { PrismCode } from "react-prism";

class Developers extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    animateRoute('enter');
  }

  render() {
    return (
      <div className="main-content developers-about -fixed">
        <h2>SOBRE CPTMETRO</h2>
        <p>CPTMetro é um projeto (em andamento) que tem como objetivo fornecer para desenvolvedores uma interface prática para buscar os status da linhas do Metro e da CPTM. Recentemente estava desenvolvendo um projeto em que precisei desses dados e percebi que não havia nenhum API publica para isso, então resolvi fazer.</p>
        <p>No final das contas acabei quebrando a ideia em 3 modulos, cada um pra estudar coisas diferentes:</p>
        <ul>
          <li>
            <h3><a href="https://github.com/vitormargis/cptmetro">Wrapper/Crawler</a></h3>
            <PrismCode language='javascript' className="language-javascript">
              {`
                cptmetro.metro().then(data => data);
              `}
            </PrismCode>
          </li>
          <li>
            <h3><a href="https://github.com/vitormargis/cptmetro-api">API</a></h3>
            <PrismCode language='javascript' className="language-html">
              {`
                http://api.cptmetro.margis.com.br/
              `}
            </PrismCode>
          </li>
          <li>
            <h3><a href="https://github.com/vitormargis/cptmetro-site">Webapp</a></h3>
            <PrismCode language='javascript' className="language-javascript">
              {`
                Este site aqui :)
              `}
            </PrismCode>
          </li>
        </ul>
      </div>
    );
  }
}

export default Developers;
