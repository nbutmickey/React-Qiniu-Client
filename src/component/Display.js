import React, { Component } from 'react'
import { List } from 'material-ui/List'
import FileList from "./file/FileList" 
import FolderList from "./file/FolderList"


export default class Display extends Component {

  openFolder(path){
    this.props.reload(path)
  }

  render () {
    var folder = this.props.fileList.commonPrefixes
    var folderComponent = folder.map((item) => {
      return (<div key={item} className='col-md-12 col-xs-12 col-lg-12 col-sm-12'>
                <FolderList item={item} open={this.openFolder.bind(this)}/>
              </div>
      )
    })

    var file = this.props.fileList.items
    var fileComponent = file.map((item) => {
      return (<div key={item.hash} className='col-md-12 col-xs-12 col-lg-12 col-sm-12'>
                <FileList item={item} basePath={this.props.basePath}/>
              </div>
      )
    })

    return (
      <div>
        <List className='row'>
          {folderComponent}
          {fileComponent}
        </List>
      </div>
    )
  }
}
