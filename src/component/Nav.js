import React, { Component } from 'react'
import { Link } from 'react-router'
import Leader from "./Leader"
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import { CardActions } from 'material-ui/Card'
import { PATH } from "./Common"

class Nav extends Component {


  getChild() {
    const currentPath = this.props.location.pathname
    if (!currentPath.includes(PATH.Settings)
      && (this.props.ak === '' || this.props.sk === '' || this.props.host === '' ||
        this.props.bucket === '' || this.props.tokenHost === '')) {
      return (<Leader open={true} />)
    } else {
      return this.props.children;
    }
  }




  render() {
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
          {this.getChild()}
        </div>
      </div>
    )
  }
}



function mapToProps(state) {
  return {
    ak: state.config.ak,
    sk: state.config.sk,
    host: state.config.host,
    bucket: state.config.bucket,
    tokenHost: state.config.tokenHost
  }
}

export default connect(mapToProps)(Nav)
