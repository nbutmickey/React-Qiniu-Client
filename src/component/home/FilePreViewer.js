import React, { Component } from 'react'

export default class FilePreViewer extends Component {
  render () {
    return (<div>
              <a className='thumbnail'><img src={this.props.basePath+this.props.file.key} alt='...' /></a>
            </div>)
  }
}
