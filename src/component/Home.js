import React, { Component } from 'react'
import { fetchFolder } from './Common'
import { connect } from 'react-redux'
import LinearProgress from 'material-ui/LinearProgress';

// 文件操作
class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isInit: false,
      folder: ""
    }
  }

  componentDidMount() {
    if (this.state.isInit) {
      return
    }

    var that = this
    fetchFolder(this.props.config.tokenHost,
      this.props.config.bucket, '', this.props.config.ak, this.props.config.sk, {
        onError() { },

        onSuccess(json) {
          that.setState({
            folder: json,
            isInit: true
          })
        }
      })
  }

  // 渲染加载中页面
  renderLoading() {
    return (
      <div className="container">
        <LinearProgress mode="indeterminate" />
      </div>
    )
  }

  renderContent() {
    return (
      <div className="container">
        0f099a25bd63a7ce3b8468adf613f5a102f27f720f099a25bd63a7ce3b8468adf613f5a102f27f72
      </div>
    )
  }

  render() {
    if (!this.state.isInit) {
      return this.renderLoading()
    } else {
      return this.renderContent()
    }
  }
}

function mapToProps(state) {
  return {
    config: state.config
  }
}

export default connect(mapToProps)(Home)
