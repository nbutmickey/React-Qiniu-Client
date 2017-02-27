import React from 'react';
import ReactDOM from 'react-dom';
import Upload from './component/Upload';
import Nav from "./component/Nav"
import Home from "./component/Home"
import Settings from "./component/Settings"
import { Router, Route, hashHistory,IndexRoute  } from 'react-router';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory} >
    <Route path="/" component={Nav}>
      <IndexRoute  component={Home} />
      <Route path="/upload" component={Upload} />
      <Route path="/settings" component={Settings} />
    </Route>
  </Router>,
  document.getElementById('app')
);
