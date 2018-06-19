import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import image from 'images/bg.png';
import metro from 'images/metro.png';
import cptm from 'images/cptm.png';

import Header from 'structure/Header'
import Footer from 'structure/Footer'

import 'styles/app.scss';

export default class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="wrapper">
          <Header />
          {this.props.children}
          <Footer />
      </div>
    );
  }
}
