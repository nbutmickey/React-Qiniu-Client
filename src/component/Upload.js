import React, { Component } from 'react'
import Qi from './Qiniu'
import '../res/css/Upload.css'
import { connect } from 'react-redux'

function mapToProps (state) {
  return {
    tokenHost: state.config.tokenHost
  }
}

class Upload extends Component {

  onDrop (files) {}

  onUpload (file) {}

  render () {
    var styles = { padding: 30}
    var dropZoneStyles = {
      margin: '20px auto',
      border: '2px dashed #ccc',
      borderRadius: '5px',
      width: '300px',
      height: '200px',
      color: '#aaa'
    }
    var size = 200
    return (
      <div className='App'>
        <Qi
          onDrop={this.onDrop}
          tokenHost={this.props.tokenHost}
          style={dropZoneStyles}
          onUpload={this.onUpload}>
          <div style={styles}>
            拖动文件或点击上传
          </div>
        </Qi>
      </div>
    )
  }
}

export default connect(mapToProps)(Upload)
