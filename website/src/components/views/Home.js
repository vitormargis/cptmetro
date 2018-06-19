import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import animateRoute from 'utils/animateRoute'
import { selectLine, featchLines } from 'actions/Lines'
import LinesList from 'modules/LinesList'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    animateRoute('enter');
  }

  render() {
    const { lines, selectLine } = this.props;
    return (
      <div className="main-content -full">
        <LinesList lines={lines.metro} title="metro" position="left" />
        <LinesList lines={lines.cptm} title="cptm" position="right" />
      </div>
    );
  }

  renderSelectedLine() {
    if (this.props.lines.selected.name) {
      return <Link to={`/line/${this.props.lines.selected.id}`}>{this.props.lines.selected.name}</Link>
    }
    return 'No line selected'
  }
}

function mapStateToProps(state) {
  return {
    about: state.about,
    lines: state.lines
  }
}

function mapDespatchToProps(dispatch) {
  return bindActionCreators({ selectLine, featchLines }, dispatch)
}


export default connect(mapStateToProps, mapDespatchToProps)(Home);
