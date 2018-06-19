import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";

import logo from 'images/logo.svg';
import animateRoute from 'utils/animateRoute'
import { featchLines } from 'actions/Lines'
import Search from 'modules/Search'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.featchLines();
    }, 1000);
    setInterval(() => {
      this.props.featchLines();
    }, 30000);
  }

  onChangeRoute(path) {
    const { history } = this.props;
    if (path !== history.location.pathname) {
      animateRoute('leave');
      setTimeout(() => {
        history.push(path)
      }, 300);
    }
  }

  render() {
    return (
      <header className="main-header">
        <h1 className="logo"><a onClick={() => this.onChangeRoute("/")} className="logo-link">
          <img src={`/${logo}`}/>
        </a></h1>
        <nav className="main-navigation">
          <Search />
          <a onClick={() => this.onChangeRoute("/developers")} className="main-navigation-links">Sobre</a>
          <a href="https://github.com/vitormargis/cptmetro" className="main-navigation-links">Github</a>
        </nav>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    about: state.about,
    lines: state.lines
  }
}

function mapDespatchToProps(dispatch) {
  return bindActionCreators({ featchLines }, dispatch)
}


export default connect(mapStateToProps, mapDespatchToProps)(withRouter(Header));
