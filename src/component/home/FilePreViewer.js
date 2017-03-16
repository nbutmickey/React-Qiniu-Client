import React, { Component } from 'react'

export default class FilePreViewer extends Component {
  render () {
    if(this.props.file.key === ""){
      return(<div></div>)
    }
    return (<div>
              <a className='thumbnail'><img src={this.props.basePath+this.props.file.key} alt='...' /></a>
            </div>)
  }
}
