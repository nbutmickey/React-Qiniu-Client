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
import {AK,SK,HOST,BUCKET,getCookies,TOKEN_HOST} from "./component/Common"



var ak = getCookies(AK)
var sk = getCookies(SK)
var bucket = getCookies(BUCKET)
var host = getCookies(HOST)
var tokenHost = getCookies(TOKEN_HOST)
var defaultState={
  config:{
        ak:ak,
        sk:sk,
        host:host,
        bucket:bucket,
        tokenHost:tokenHost
  }
}
const logger = createLogger();
let store = createStore(AppAction,defaultState,applyMiddleware(thunk, promise, logger))

//主页和上传页面要求设置
function auth(nextState, replace, callback){
  var config = store.getState().config;
  if(config.ak===""||config.sk===""||config.host===""||
     config.bucket===""||config.tokenHost===""){
    replace("/settings")
  }
  callback();
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} >
      <Route path="/" component={Nav}>
        <IndexRoute component={Home} onEnter={auth} />
        <Route path="/upload" component={Upload} onEnter={auth}/>
        <Route path="/settings" component={Settings} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
