import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import animateRoute from 'utils/animateRoute'
import normalizeChars from 'utils/normalizeChars'
import { selectLine, featchLines } from 'actions/Lines'

import search from 'images/search.svg'
import line1 from 'images/lines/l1.png'
import line2 from 'images/lines/l2.png'
import line3 from 'images/lines/l3.png'
import line4 from 'images/lines/l4.png'
import line5 from 'images/lines/l5.png'
import line15 from 'images/lines/l15.jpg'
import line7 from 'images/lines/l7.jpg'
import line8 from 'images/lines/l8.png'
import line9 from 'images/lines/l9.png'
import line10 from 'images/lines/l10.png'
import line11 from 'images/lines/l11.png'
import line12 from 'images/lines/l12.png'
import line13 from 'images/lines/l13.png'

const lineMap = {
  '1': line1,
  '2': line2,
  '3': line3,
  '4': line4,
  '5': line5,
  '15': line15,
  '7': line7,
  '8': line8,
  '9': line9,
  '10': line10,
  '11': line11,
  '12': line12,
  '13': line13,
}

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
    super(props)
    this.state = {
      search: '',
      filteredLines: []
    }
  }

  componentDidMount() {
  }

  onSearch(event) {
    const { lines, selectLine } = this.props;
    const allLines = [...lines.metro, ...lines.cptm];
    const filteredLines = allLines.filter(line => {
      const name = normalizeChars(line.name).toLowerCase();
      const status = normalizeChars(line.status).toLowerCase();
      const searchTerm = normalizeChars(event.target.value).toLowerCase();
      return name.includes(searchTerm) || status.includes(searchTerm)
    })

    this.setState({ filteredLines, search: event.target.value })
    console.log(filteredLines);
  }

  onSearchLeave(event) {
    setTimeout(() => {
      this.setState({ filteredLines: [], search: '' })
    }, 300);
  }

  goToLine(line) {
    console.log('a');
    const { history } = this.props;
    animateRoute('leave');
    setTimeout(() => {
      animateRoute('enter');
      history.push(`/line/${line.id}`)
    }, 300);
  }

  renderSearchResult() {
    if (!this.state.filteredLines.length) {
      return (
        <ul className="search-result">
          <li>
            <span style={{opacity: 0.2}} className="line-name">No results</span>
          </li>
        </ul>
      )
    }
    return (
      <ul className="search-result">
        {this.state.filteredLines.map(line => (
          <li key={line.id} onClick={this.goToLine.bind(this, line)}>
            <span className={`line-icon -mini -${normalizeChars(line.color).toLowerCase()}`}></span>
            <span className="line-name">{line.name}</span>
            <span className={`line-status -${statusEnum[line.status]}`}></span>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const { lines, selectLine } = this.props;
    const allLines = [...lines.metro, ...lines.cptm];
    return (
      <div className="search-container">
        <input placeholder="Buscar" value={this.state.search} onChange={this.onSearch.bind(this)} onBlur={this.onSearchLeave.bind(this)} type="text"/>
        {this.state.search.length > 0 ? this.renderSearchResult() : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state,
    lines: state.lines
  }
}

function mapDespatchToProps(dispatch) {
  return bindActionCreators({ selectLine, featchLines }, dispatch)
}

export default connect(mapStateToProps, mapDespatchToProps)(withRouter(Line));
