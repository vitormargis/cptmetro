import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import ReduxPromise from 'redux-promise';

import '../index.html';
import Main from 'structure/Main.js';
import Home from 'views/Home.js';
import Line from 'views/Line.js';
import Developers from 'views/Developers.js';

import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Main>
        <Switch>
          <Route path="/line/:id" component={Line} />
          <Route path="/developers" component={Developers} />
          <Route path="/" component={Home} />
        </Switch>
      </Main>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#app')
);
