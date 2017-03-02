import React, { Component } from 'react'
import { ToastContainer, ToastMessage } from 'react-toastr'
import '../res/css/Settings.css'
import { connect } from 'react-redux'
import { modifyConfig } from '../redux/Actions'
import { DEFAULT_TOKEN_HOST } from './Common'
import FlatButton from 'material-ui/FlatButton'

const ToastMessageFactory = React.createFactory(ToastMessage.animation)

function mapStateToProps (state) {
  return {
    ak: state.config.ak,
    sk: state.config.sk,
    host: state.config.host,
    bucket: state.config.bucket,
    tokenHost: state.config.tokenHost
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    saveToStore: (state) => {
      dispatch(modifyConfig(state.ak, state.sk, state.bucket, state.host, state.tokenHost))
    }
  }
}

class Settings extends Component {

  constructor (props) {
    super(props)
    this.state = props
  }

  onAk (e) {
    this.setState({
      ak: e.target.value
    })
  }

  onSk (e) {
    this.setState({
      sk: e.target.value
    })
  }

  onHost (e) {
    this.setState({
      host: e.target.value
    })
  }

  onBucket (e) {
    this.setState({
      bucket: e.target.value
    })
  }

  onTokenHost (e) {
    this.setState({
      tokenHost: e.target.value
    })
  }

  onSave () {
    if (this.state.ak == '' || this.state.sk == '' || this.state.host == '' || this.state.bucket == '') {
      this.refs.container.error(`Some Filed is Empty`, `Error`, {
        closeButton: true
      })
      return
    }

    this.props.saveToStore(this.state)

    this.refs.container.success(`Save Sucess`, `Settings`, {
      closeButton: true
    })
  }

  onReset () {
    this.setState({
      ak: '',
      sk: '',
      host: '',
      bucket: '',
      tokenHost: DEFAULT_TOKEN_HOST
    })
    
    //setState是异步函数
    setTimeout(()=>this.props.saveToStore(this.state),1000)

    this.refs.container.success(`Reset Sucess`, `Settings`, {
      closeButton: true
    })
  }

  render () {
    return (
      <div className='container'>
        <ToastContainer toastMessageFactory={ToastMessageFactory} ref='container' className='toast-top-right' />
        <div className='col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2 col-md-4 col-md-offest-4 col-lg-4 col-lg-offest-6 centerInParent'>
          <form className='form-horizontal'>
            <div className='form-group'>
              <div>
                <input
                  type='text'
                  value={this.state.ak}
                  className='form-control'
                  placeholder='AccessKey'
                  onChange={this.onAk.bind(this)} />
              </div>
            </div>
            <div className='form-group'>
              <div>
                <input
                  type='text'
                  value={this.state.sk}
                  className='form-control'
                  placeholder='SecretKey'
                  onChange={this.onSk.bind(this)} />
              </div>
            </div>
            <div className='form-group'>
              <div>
                <input
                  type='text'
                  value={this.state.bucket}
                  className='form-control'
                  placeholder='Bucket'
                  onChange={this.onBucket.bind(this)} />
              </div>
            </div>
            <div className='form-group'>
              <div>
                <input
                  type='text'
                  value={this.state.host}
                  className='form-control'
                  placeholder='七牛绑定域名(http(s)://xx.xx.xx/)'
                  onChange={this.onHost.bind(this)} />
              </div>
            </div>
            <div className='form-group'>
              <div>
                <input
                  type='text'
                  value={this.state.tokenHost}
                  className='form-control'
                  placeholder='Token服务器'
                  onChange={this.onTokenHost.bind(this)} />
              </div>
            </div>
            <div className='form-group'>
              <div>

                <FlatButton label='保存' onTouchTap={this.onSave.bind(this)}/>
                <FlatButton label='重置' onTouchTap={this.onReset.bind(this)}/>

              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
