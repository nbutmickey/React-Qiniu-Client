import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import { CardActions } from 'material-ui/Card'
import {PATH} from "./Common"

class Nav extends Component {
  render () {
    return (
      <div className='container'>
        {/* 导航条部分 */}
        <div>
          <CardActions>
            <Link to={PATH.Home}>
            <FlatButton label='首页' />
            </Link>
            <Link to={PATH.Upload}>
            <FlatButton label='上传' />
            </Link>
            <Link to={PATH.Settings}>
            <FlatButton label='设置' />
            </Link>
          </CardActions>

        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect()(Nav)
