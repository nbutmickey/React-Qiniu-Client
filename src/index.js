import React from 'react';
import ReactDOM from 'react-dom';
import Upload from './component/Upload';
import Nav from "./component/Nav"
import Home from "./component/Home"
import Settings from "./component/Settings"
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux'
import './res/css/index.css';
import AppAction from "./redux/Reducers"
import {AK,SK,HOST,BUCKET,getCookies} from "./component/Common"



var ak = getCookies(AK)
var sk = getCookies(SK)
var bucket = getCookies(BUCKET)
var host = getCookies(HOST)
var defaultState={
  config:{
        ak:ak,
        sk:sk,
        host:host,
        bucket:bucket
  }
}
const logger = createLogger();
let store = createStore(AppAction,defaultState,applyMiddleware(thunk, promise, logger))
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} >
      <Route path="/" component={Nav}>
        <IndexRoute component={Home} />
        <Route path="/upload" component={Upload} />
        <Route path="/settings" component={Settings} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
