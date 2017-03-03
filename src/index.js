import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Upload from './pages/Upload'
import Nav from './component/Nav'
import Home from './pages/Home'
import Settings from './pages/Settings'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import { Provider } from 'react-redux'
import './res/css/index.css'
import AppAction from './redux/Reducers'
import { AK, SK, HOST, BUCKET, getCookies, TOKEN_HOST, DEFAULT_TOKEN_HOST, PATH } from './component/Common'
import { MuiThemeProvider } from 'material-ui'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

var ak = getCookies(AK)
var sk = getCookies(SK)
var bucket = getCookies(BUCKET)
var host = getCookies(HOST)
var tokenHost = getCookies(TOKEN_HOST)
if (tokenHost === '') {
  tokenHost = DEFAULT_TOKEN_HOST
}
var defaultState = {
  config: {
    ak: ak,
    sk: sk,
    host: host,
    bucket: bucket,
    tokenHost: tokenHost
  }
}
const logger = createLogger()
let store = createStore(AppAction, defaultState, applyMiddleware(thunk, promise, logger))


class App extends Component {


  constructor(props){
    super(props)
    this.state = {
      leader:false
    }
    this.auth = this.auth.bind(this)
  }

  // 主页和上传页面要求设置
  auth(nextState, replace, callback) {
    // var config = store.getState().config
    // if (config.ak === '' || config.sk === '' || config.host === '' ||
    //   config.bucket === '' || config.tokenHost === '') {
    //   replace(PATH.Settings)
    // }
    callback()
  }



  render() {
    return (
      <MuiThemeProvider>
          <Provider store={store}>
            <Router history={hashHistory}>
              <Route path={PATH.Home} component={Nav}>
                <IndexRoute component={Home} onEnter={this.auth} />
                <Route path={PATH.Upload} component={Upload} onEnter={this.auth} />
                <Route path={PATH.Settings} component={Settings} />
              </Route>
            </Router>
          </Provider>
      </MuiThemeProvider>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('app')
)
