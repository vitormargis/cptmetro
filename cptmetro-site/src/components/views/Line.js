import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import animateRoute from 'utils/animateRoute';
import normalizeChars from 'utils/normalizeChars';
import { selectLine, featchLines } from 'actions/Lines';

import line1 from 'images/lines/l1.png';
import line2 from 'images/lines/l2.png';
import line3 from 'images/lines/l3.png';
import line4 from 'images/lines/l4.png';
import line5 from 'images/lines/l5.png';
import line15 from 'images/lines/l15.jpg';
import line7 from 'images/lines/l7.jpg';
import line8 from 'images/lines/l8.png';
import line9 from 'images/lines/l9.png';
import line10 from 'images/lines/l10.png';
import line11 from 'images/lines/l11.png';
import line12 from 'images/lines/l12.png';
import line13 from 'images/lines/l13.png';

const lineMap = {
  1: line1,
  2: line2,
  3: line3,
  4: line4,
  5: line5,
  15: line15,
  7: line7,
  8: line8,
  9: line9,
  10: line10,
  11: line11,
  12: line12,
  13: line13,
};

const statusEnum = {
  'Operação Normal': 'positive',
  'Operação Encerrada': 'negative',
  'Operações Encerradas': 'negative',
  'Operação Parcial': 'warning',
  'Velocidade Reduzida': 'warning',
  'Paralisada': 'negative',
  'Dados Indisponíveis': 'negative'
};

class Line extends Component {
  constructor(props) {
    super(props);
    this.filterCurrentLine = this.filterCurrentLine.bind(this);
  }

  componentDidMount() {
    animateRoute('enter');
    const { lines } = this.props;
    if (!lines.metro.length && !lines.metro.cptm) return this.props.featchLines();
  }

  filterCurrentLine(line) {
    return line.id === this.props.match.params.id;
  }

  render() {
    const { lines, selectLine } = this.props;
    const line = [...lines.metro, ...lines.cptm].filter(this.filterCurrentLine)[0] || {};
    return (
      <div className="main-content -fixed">
        <a className="favorite" onClick={() => selectLine(line)}>Star as Favorite</a> <br />
        <div className="line-map" key={line.id}>
          <span className={`line-icon -${normalizeChars(line.color && line.color.toLowerCase())}`} />
          <span className="line-name">{line.name}</span>
          <span className={`line-status -${statusEnum[line.status]}`}>{line.status}</span>
          <img src={`/${lineMap[line.id]}`} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    lines: state.lines
  };
}

function mapDespatchToProps(dispatch) {
  return bindActionCreators({ selectLine, featchLines }, dispatch);
}

export default connect(mapStateToProps, mapDespatchToProps)(Line);
