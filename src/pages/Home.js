import React, { Component } from 'react'
import { fetchFolder, deleteFile, renameFile } from '../component/Common'
import { connect } from 'react-redux'
import LinearProgress from 'material-ui/LinearProgress'
import Display from '../component/home/Display'

// 文件操作
class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      folder: '',
      isInit: false,
      pathStack: []
    }

    this.reload = this.reload.bind(this)
  }

  delete (key) {
    var that = this
    deleteFile(this.props.config.tokenHost,
      key,
      this.props.config.bucket,
      this.props.config.ak,
      this.props.config.sk, {
        onSuccess() {
          var fileList = that.state.folder.items

          var after = fileList.filter((item) => {
            if (item.key === key) {
              return false
            }
            return true
          })

          var folder = that.state.folder

          folder.items = after

          that.setState({
            folder: folder,
            isLoading: false
          })
        },
        onError() {}
      })
  }

  rename (older, newer) {
    var that = this
    renameFile(this.props.config.tokenHost,
      older,
      newer,
      this.props.config.bucket,
      this.props.config.ak,
      this.props.config.sk, {
        onSuccess() {
          var fileList = that.state.folder.items

          var after = fileList.map((item) => {
            if (item.key === older) {
              item.key = newer
            }
            return item
          })

          var folder = that.state.folder

          folder.items = after

          that.setState({
            folder: folder,
            isLoading: false
          })
        },
        onError() {}
      })
  }

  reload (pre) {
    this.setState({
      isLoading: true
    })

    var that = this
    fetchFolder(this.props.config.tokenHost,
      this.props.config.bucket, pre, this.props.config.ak, this.props.config.sk, {
        onError() {},
        onSuccess(json) {
          that.setState({
            folder: json,
            isLoading: false,
            isInit: true,
            parent: pre
          })
        }
      })
  }

  componentDidMount () {
    this.reload('')
  }

  // 渲染加载中页面
  renderLoading () {
    return (
      <div className='container'>
        <LinearProgress mode='indeterminate' />
      </div>
    )
  }

  renderContent () {
    return (
      <div className='container'>
        <Display
          fileList={this.state.folder}
          reload={this.reload}
          parent={this.state.parent}
          rename={this.rename.bind(this)}
          delete={this.delete.bind(this)}
          basePath={this.props.config.host} />
      </div>
    )
  }

  render () {
    var loadingComponent = ''
    if (this.state.isLoading) {
      loadingComponent = this.renderLoading()
    }

    var contentComponent = ''
    if (this.state.isInit) {
      contentComponent = this.renderContent()
    }
    return (
      <div className='container'>
        {loadingComponent}
        {contentComponent}
      </div>
    )
  }
}

function mapToProps (state) {
  return {
    config: state.config
  }
}

export default connect(mapToProps)(Home)
